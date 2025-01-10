import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { CourseEntity } from "../../../domain/entities";
import { getPublicUrl } from "../../../_lib/s3/s3bucket";

export interface Lesson {
    title: string;
    description: string;
    duration: string;
    videoUrl: string | null;
    isIntroduction: boolean;
}


export const getAllCoursesController = (dependencies: IDependencies) => {
    const { useCases: { getAllCoursesUseCase } } = dependencies;
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const courses = await getAllCoursesUseCase(dependencies).execute();
            
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

            res.status(200).json({
                success: true,
                data: updatedCourses,
            });
            return;
        } catch (error) {
            console.log(error);
            next(error);
        }
    };
};