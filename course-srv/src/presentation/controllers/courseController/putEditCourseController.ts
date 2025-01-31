import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../../application/interfaces/IDependencies"
import { removeFilesFromS3 } from "../../../_lib/s3/s3bucket";
import { CourseContent } from '../../../domain/entities/CourseEdit';

export const putEditCourseController = (dependencies:IDependencies) => {
    const {useCases:{ editCourseUseCase }} = dependencies;
    return async (req:Request,res:Response, next:NextFunction) => {
        try {
            if (!req.user) {
                res.status(401).json({ success: false, message: "Authentication required: No User Provided" });
                return;
            }
            const removeLessonIndex: number[] = []
            const {basicDetails, pricing, metadata, _id} = req.body.course;
            const courseContent = req.body.course.courseContent as CourseContent
            if(typeof courseContent.lessons[0].videoUrl == "object"){
                console.log("fuck retured")
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

            courseContent.lessons.forEach((lesson:any,index:number) => {

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
                res.status(404).json({
                    success:false,
                    message:"Failed to edit the course"
                })
                return;
            }
            await removeFilesFromS3(result?.s3Remove)
            
            // TODO: need to update the payment service with the new course details by producing it

            res.status(200).json({
                success:true,
                message:"Course edited successfully",
                data:result.updatedCourse
            })
            return;
        } catch (error) {
            console.log("ERROR in the putEditCourseController",error)
            // next(error)
        }
    }
}