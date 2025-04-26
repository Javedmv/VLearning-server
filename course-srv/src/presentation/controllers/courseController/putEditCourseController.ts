import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../../application/interfaces/IDependencies"
import { removeFilesFromS3 } from "../../../_lib/s3/s3bucket";
import { CourseContent } from '../../../domain/entities/CourseEdit';
import { sendEditCourseDetailsProducer } from "../../../infrastructure/kafka/producers";
import { TOBE } from "../../../_lib/common/Tobe";
import { createResponse, StatusCode } from "../../../_lib/constants";

export const putEditCourseController = (dependencies:IDependencies) => {
    const {useCases:{ editCourseUseCase }} = dependencies;
    return async (req:Request,res:Response, next:NextFunction) => {
        try {
            if (!req.user) {
                res.status(StatusCode.UNAUTHORIZED).json(
                    createResponse(
                        StatusCode.UNAUTHORIZED,
                        undefined,
                        "Authentication required: No User Provided"
                    )
                );
                return;
            }
            const removeLessonIndex: number[] = []
            const {basicDetails, pricing, metadata, _id} = req.body.course;
            const courseContent = req.body.course.courseContent as CourseContent
            if(typeof courseContent.lessons[0].videoUrl == "object"){
                return;
            }
            const courseId = req.params.id;


            if(typeof basicDetails.category === 'object'){
                basicDetails.category = basicDetails.category._id
            }
            if(basicDetails.thumbnail.startsWith("http")){
                delete basicDetails.thumbnail;
            }else{
                delete basicDetails.thumbnailPreview;
            }

            courseContent.lessons.forEach((lesson:TOBE,index:number) => {

                if(lesson.videoPreview){
                    delete lesson.videoPreview
                    removeLessonIndex.push(index);
                }else{
                    if(lesson.videoUrl.startsWith("http")){
                        delete lesson.videoUrl
                    }
                }
            })
            
            const result = await editCourseUseCase(dependencies).execute(courseId,{basicDetails,
            courseContent,pricing,metadata,_id},removeLessonIndex);

            if(!result){
                res.status(StatusCode.NOT_FOUND).json(
                    createResponse(
                        StatusCode.NOT_FOUND,
                        undefined,
                        "Failed to edit the course"
                    )
                );
                return;
            }

            if(result.s3Remove && result.s3Remove.length > 0){
                await removeFilesFromS3(result?.s3Remove)
            }
            
            if(result.updatedCourse){
                await sendEditCourseDetailsProducer(result.updatedCourse,"payment-srv-topic");
                await sendEditCourseDetailsProducer(result.updatedCourse,"chat-srv-topic");
            }

            res.status(StatusCode.SUCCESS).json(
                createResponse(
                    StatusCode.SUCCESS,
                    result.updatedCourse,
                    "Course edited successfully"
                )
            );
            return;
        } catch (error) {
            console.log("ERROR in the putEditCourseController",error)
            // next(error)
        }
    }
}