import { CategoryModel, EnrollmentProgressModel, User } from "../models";
import { CourseModel } from "../models/courseSchema";

export const getAllMyLearning = async (userId: string): Promise<any> => {
    try {
        const enrollments = await EnrollmentProgressModel.find({ userId })
            .populate({
                path: "courseId",
                model: CourseModel,
                populate: [
                    { 
                        path: "basicDetails.category", 
                        model: CategoryModel // Ensure correct model name and schema
                    },
                    { 
                        path: "instructor", 
                        model: User // Populating instructor details
                    }
                ]
            })
            .populate({
                path: "userId",
                model: User // Ensure correct user model
            });
            return enrollments;
    } catch (error) {
        console.log(error, "ERROR, getAllMyLearning repo");
        return Promise.resolve(null);
    }
};
