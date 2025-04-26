import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { getPublicUrl } from "../../../_lib/s3/s3bucket";
import { ErrorResponse } from "../../../_lib/error";
import { TOBE } from "../../../_lib/common/Tobe";
import { createResponse, StatusCode } from "../../../_lib/constants";

export const getMyLearningController = (dependencies:IDependencies) => {
    const {useCases:{ getMyLearningUseCase }} = dependencies;
    return async(req:Request,res:Response,next:NextFunction) => {
        try {
            if(!req.user){
                throw ErrorResponse.unauthorized("User not found.")
            }
            const userId = req.user._id;

            let enrollments = await getMyLearningUseCase(dependencies).execute(userId);

            if (!enrollments) {
                res.status(StatusCode.NOT_FOUND).json(
                    createResponse(
                        StatusCode.NOT_FOUND,
                        undefined,
                        "No enrollments found"
                    )
                );
                return;
            }

            const updatedEnrollments = await Promise.all(enrollments.map(async (enrollment: TOBE) => {
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
                        updatedCourse.courseContent.lessons.map(async (lesson: TOBE) => {
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
            
            res.status(StatusCode.SUCCESS).json(
                createResponse(
                    StatusCode.SUCCESS,
                    updatedEnrollments
                )
            );
            return
        } catch (error) {
            console.error("Error in getMyLearningController:", error);
            next(error);
        }
    }
}