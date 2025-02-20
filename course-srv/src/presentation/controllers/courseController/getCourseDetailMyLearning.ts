import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { getPublicUrl } from "../../../_lib/s3/s3bucket";

export const getCourseDetailMyLearning = (dependencies:IDependencies) => {
    const {useCases: {courseDetailMyLearningUseCase}} = dependencies;
    return async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { enrollmentId } = req.params;
            if(!req.user) {
                throw new Error("User not found");
            };
            const enrollments = await courseDetailMyLearningUseCase(dependencies).execute(enrollmentId, req.user._id);
            console.log("controller-----------------------------", enrollments);
            if (!enrollments) {
                res.status(404).json({ message: "No enrollments found" });
                return;
            }

            const updatedEnrollments = await Promise.all(enrollments.map(async (enrollment: any) => {
                if (!enrollment.courseId) return enrollment; // Skip if no course found
                
                const updatedCourse = enrollment.courseId.toObject();

                if (updatedCourse?.basicDetails?.thumbnail) {
                    const publicThumbnailUrl = await getPublicUrl(
                        process.env.S3_BUCKET_NAME!,
                        updatedCourse.basicDetails.thumbnail
                    );
                    updatedCourse.basicDetails.thumbnail = publicThumbnailUrl;
                }

                if (updatedCourse?.courseContent?.lessons) {
                    updatedCourse.courseContent.lessons = await Promise.all(
                        updatedCourse.courseContent.lessons.map(async (lesson: any) => {
                            if (lesson.videoUrl) {
                                const publicVideoUrl = await getPublicUrl(
                                    process.env.S3_BUCKET_NAME!,
                                    lesson.videoUrl
                                );
                                return { ...lesson, videoUrl: publicVideoUrl };
                            }
                            return lesson;
                        })
                    );
                }

                return { ...enrollment.toObject(), courseId: updatedCourse };
            }));

            res.status(200).json({
                success: true,
                data: updatedEnrollments,
                message: "Course details fetched"
            });
            return;
        } catch (error) {
            next(error);
        }
    }
}