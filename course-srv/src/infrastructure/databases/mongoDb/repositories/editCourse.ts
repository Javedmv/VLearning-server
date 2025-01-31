import { CourseModel } from "../models/courseSchema";
import { CategoryModel } from "../models";

export const editCourse = async (courseId: string, updates: any,removeLessonIndex: number[]) => {
    try {
        const existingCourse = await CourseModel.findById(courseId);
        if (!existingCourse) {
            throw new Error("Course not found");
        }

        const s3Remove: string[] = removeLessonIndex.flatMap(index => existingCourse.courseContent.lessons[index]?.videoUrl ?? []);
                

        const oldCategoryId = existingCourse.basicDetails.category?.toString();
        const newCategoryId = updates.basicDetails?.category;

        // Update category count only if it has changed
        if (newCategoryId && oldCategoryId !== newCategoryId) {
            await CategoryModel.updateOne({ _id: oldCategoryId }, { $inc: { count: -1 } });
            await CategoryModel.updateOne({ _id: newCategoryId }, { $inc: { count: 1 } });
        }
        console.log(updates.courseContent)



        // Create a new course object excluding specific fields
        const updatedCourseData = {
            basicDetails: {
                title: updates.basicDetails?.title ?? existingCourse.basicDetails.title,
                description: updates.basicDetails?.description ?? existingCourse.basicDetails.description,
                thumbnail: updates.basicDetails?.thumbnail ?? existingCourse.basicDetails.thumbnail,
                language: updates.basicDetails?.language ?? existingCourse.basicDetails.language,
                category: updates.basicDetails?.category ?? existingCourse.basicDetails.category,
                whatWillLearn: updates.basicDetails?.whatWillLearn ?? existingCourse.basicDetails.whatWillLearn,
            },
            courseContent: {
                lessons: updates.courseContent?.lessons?.map((lesson: any, index: number) => ({
                    ...lesson,
                    videoUrl: lesson?.videoUrl ?? existingCourse.courseContent.lessons?.[index]?.videoUrl ?? "",
                }))
            },
            pricing: {
                type: updates.pricing?.type ?? existingCourse.pricing.type,
                amount: updates.pricing?.amount ?? existingCourse.pricing.amount,
                hasLifetimeAccess: updates.pricing?.hasLifetimeAccess ?? existingCourse.pricing.hasLifetimeAccess,
                subscriptionType: updates.pricing?.subscriptionType ?? existingCourse.pricing.subscriptionType,
            },
            metadata: {
                createdBy: existingCourse.metadata.createdBy,
                createdAt: existingCourse.metadata.createdAt,
                updatedBy: updates.metadata?.updatedBy ?? existingCourse.metadata.updatedBy,
                updatedAt: updates.metadata?.updatedAt ?? new Date(),
            },
        };

        // Apply updates to existing document
        existingCourse.set(updatedCourseData);

        // Save the updated course document
        const updatedCourse = await existingCourse.save();

        return {updatedCourse,s3Remove};
    } catch (error) {
        console.error("Error in editCourse repository:", error);
        return false;
    }
};
