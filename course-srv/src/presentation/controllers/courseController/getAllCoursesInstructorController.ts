import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { getPublicUrl } from "../../../_lib/s3/s3bucket";
import { Lesson } from "./getAllCoursesController";
import { TOBE } from "../../../_lib/common/Tobe";
import { createResponse, StatusCode } from "../../../_lib/constants";

export const getAllCoursesInstructorController = (dependencies:IDependencies) => {
    const {useCases:{getAllCoursesInstructorUseCase}} = dependencies;
    return async(req:Request,res:Response,next:NextFunction): Promise<void> => {
        try {
            const instrctId = req.params.id;
            if(!instrctId){
                 res.status(404).json({
                    success:false,
                    message:"Failed to fetch the course details."
                })
                return
            }
            const courses = await getAllCoursesInstructorUseCase(dependencies).execute(instrctId);

            const updatedCourses = await Promise.all(courses.map(async (course:TOBE) => {
                const updatedCourse = course.toObject();
                
                // Update thumbnail URL
                if (updatedCourse?.basicDetails?.thumbnail) {
                    const publicThumbnailUrl = await getPublicUrl(
                        process.env.S3_BUCKET_NAME!,
                        updatedCourse.basicDetails.thumbnail
                    );
                    updatedCourse.basicDetails.thumbnail = publicThumbnailUrl;
                }

                // Update video URLs for each lesson
                if (updatedCourse?.courseContent?.lessons) {
                    updatedCourse.courseContent.lessons = await Promise.all(
                        updatedCourse.courseContent.lessons.map(async (lesson:Lesson) => {
                            if (lesson.videoUrl) {
                                const publicVideoUrl = await getPublicUrl(
                                    process.env.S3_BUCKET_NAME!,
                                    lesson.videoUrl
                                );
                                return {
                                    ...lesson,
                                    videoUrl: publicVideoUrl
                                };
                            }
                            return lesson;
                        })
                    );
                }
                
                return updatedCourse;
            }));

            res.status(StatusCode.SUCCESS).json(
                createResponse(
                    StatusCode.SUCCESS,
                    updatedCourses
                )
            );
            return
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}