import { TOBE } from "../../../../_lib/common/Tobe";
import { CourseFilters } from "../../../../domain/entities/CourseFilter";
import { CategoryModel, EnrollmentProgressModel, User } from "../models";
import { CourseModel } from "../models/courseSchema";

export const getAllMyLearning = async (userId: string,filters:CourseFilters): Promise<TOBE> => {
    try {
        const total = await EnrollmentProgressModel.countDocuments({ userId });
        const enrollments = await EnrollmentProgressModel.find({ userId })
        .skip((filters.page - 1) * filters.limit)
        .limit(filters.limit)
        .populate({
            path: "courseId",
            model: CourseModel,
            populate: [
                { 
                    path: "basicDetails.category", 
                    model: CategoryModel
                },
                { 
                    path: "instructor", 
                    model: User
                }
            ]
        })
        .populate({
            path: "userId",
            model: User
        });

        return {enrollments, total};
    } catch (error) {
        console.log(error, "ERROR, getAllMyLearning repo");
        return Promise.resolve(null);
    }
};
