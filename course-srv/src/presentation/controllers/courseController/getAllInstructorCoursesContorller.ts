import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { getPublicUrl } from "../../../_lib/s3/s3bucket";
import { Lesson } from "./getAllCoursesController";

export const getAllInstructorCoursesContorller = (dependencies:IDependencies) => {
    const {useCases: {getAllInstructorCoursesUseCase}} = dependencies;
    return async (req:Request,res:Response,next:NextFunction) => {
        try {
            if (!req.user) {
                res.status(401).json({ success: false, message: "Authentication required: No User Provided" });
                return;
            }
            const { page, limit} = req.query;
            const filters = {
                page: parseInt(page as string, 10) || 1,
                limit: parseInt(limit as string, 10) || 3,
            }
            
            const instrId = req.params.id
            const {courses, total} = await getAllInstructorCoursesUseCase(dependencies).execute(instrId,filters);

            if (!courses || !Array.isArray(courses)) {
                res.status(404).json({ success: false, message: "No courses found" });
                return;
            }

            const updatedCourses = await Promise.all(courses.map(async (course) => {
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

            const totalPages = Math.ceil(total / filters.limit);

            res.status(200).json({
                success: true,
                data: updatedCourses,
                totalPages: totalPages,
                total: total,
            });
            return;
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}