import { CourseEntity } from "../../../../domain/entities";
import { CategoryModel } from "../models";
import { CourseModel } from "../models/courseSchema";

export const addCourse = async (course: CourseEntity, instrId:string): Promise<CourseEntity | null> => {
    try {
        const newCourse = new CourseModel({
            instructorId:instrId,
            instructor: instrId,
            students:[],
            basicDetails: {
                title: course.basicDetails.title,
                description: course.basicDetails.description,
                thumbnail: course.basicDetails.thumbnail,
                language: course.basicDetails.language,
                category: course.basicDetails.category,
                whatWillLearn: course.basicDetails.whatWillLearn
            },
            courseContent: {
                lessons: course.courseContent.lessons.map((lesson,index) => ({
                    title: lesson.title,
                    description: lesson.description,
                    duration: lesson.duration,
                    videoUrl: lesson.videoUrl,
                    isIntroduction: index === 0 ? true : lesson.isIntroduction
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

        if (savedCourse) {
            await CategoryModel.updateOne(
                { _id: course.basicDetails.category },
                { $inc: { count: 1 } } // Increment the count field by 1
            );
            console.log('Category count updated successfully.');
        } else {
            console.log('Failed to save the course.');
        }

        return savedCourse as CourseEntity;
    } catch (error) {
        console.log("Error in course add repo:", error);
        return Promise.resolve(null);
    }
}