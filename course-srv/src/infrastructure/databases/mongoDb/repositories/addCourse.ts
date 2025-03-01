import { CourseEntity } from "../../../../domain/entities";
import { CourseModel } from "../models/courseSchema";

export const addCourse = async (course: CourseEntity, instrId:string): Promise<CourseEntity | null> => {
    try {
        const newCourse = new CourseModel({
            instructorId:instrId,
            basicDetails: {
                title: course.basicDetails.title,
                description: course.basicDetails.description,
                thumbnail: course.basicDetails.thumbnail,
                language: course.basicDetails.language,
                category: course.basicDetails.category,
                whatWillLearn: course.basicDetails.whatWillLearn
            },
            courseContent: {
                lessons: course.courseContent.lessons.map(lesson => ({
                    title: lesson.title,
                    description: lesson.description,
                    duration: lesson.duration,
                    videoUrl: lesson.videoUrl,
                    isIntroduction: lesson.isIntroduction
                }))
            },
            pricing: {
                type: course.pricing.type,
                amount: course.pricing.amount,
                hasLifetimeAccess: course.pricing.hasLifetimeAccess,
                subscriptionType: course.pricing.subscriptionType
            },
            metadata: {
                createdBy: course.metadata.createdBy,
                createdAt: course.metadata.createdAt,
                updatedBy: course.metadata.updatedBy,
                updatedAt: course.metadata.updatedAt
            }
        });

        // Save the course to the database
        const savedCourse = await newCourse.save();
        return savedCourse as CourseEntity;
    } catch (error) {
        console.log("Error in course add repo:", error);
        return Promise.resolve(null);
    }
}