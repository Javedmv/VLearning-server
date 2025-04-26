import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { getPublicUrl } from "../../../_lib/s3/s3bucket";
import { TOBE } from "../../../_lib/common/Tobe";
import { createResponse, StatusCode } from "../../../_lib/constants";


export const getAllDetailsLandingPageController = (dependencies: IDependencies) => {
    const { useCases: { getLandingPageCoursesUseCase, getLandingPageInstructorsUseCase } } = dependencies;
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const courses = await getLandingPageCoursesUseCase(dependencies).execute();
            const instructors = await getLandingPageInstructorsUseCase(dependencies).execute();

            // Process courses to get thumbnails from S3
            const coursesWithThumbnails = await Promise.all(courses.map(async (course:TOBE) => {
                // Create a new object with the _doc properties spread at the top level
                const courseData = {
                    ...course._doc || course,
                    instructorName: course.instructorId?.username || 'Instructor'
                };
                
                // Add the thumbnail URL if it exists
                if (courseData.thumbnail) {
                    const thumbnailUrl = await getPublicUrl(
                        process.env.S3_BUCKET_NAME!,
                        courseData.thumbnail
                    );
                    courseData.thumbnail = thumbnailUrl;
                }
                
                // Add basic details thumbnail if it exists
                if (courseData.basicDetails && courseData.basicDetails.thumbnail) {
                    const basicThumbnailUrl = await getPublicUrl(
                        process.env.S3_BUCKET_NAME!,
                        courseData.basicDetails.thumbnail
                    );
                    courseData.basicDetails.thumbnail = basicThumbnailUrl;
                }
                
                return courseData;
            }));

            // Process instructors to get profile images from S3
            const instructorsWithProfileImages = await Promise.all(instructors.map(async (instructor:TOBE) => {
                // Create a new object with the _doc properties spread at the top level
                const instructorData = {
                    ...instructor._doc,
                    profile: { ...instructor.profile },
                    rating: instructor.rating || 4.5 // Default rating if not available
                };
                
                // Add the profile image URL if it exists
                if (instructor.profile && instructor.profile.avatar) {
                    const profileImageUrl = await getPublicUrl(
                        process.env.S3_BUCKET_NAME!,
                        instructor.profile.avatar
                    );
                    instructorData.profile.avatar = profileImageUrl;
                }
                
                return instructorData;
            }));

            res.status(StatusCode.SUCCESS).json(
                createResponse(
                    StatusCode.SUCCESS,
                    {
                        courses: coursesWithThumbnails,
                        instructors: instructorsWithProfileImages
                    },
                    "Landing page details fetched successfully" // Custom message
                )
            );
            return;
        } catch (error) {
            next(error);
        }
    }
}
