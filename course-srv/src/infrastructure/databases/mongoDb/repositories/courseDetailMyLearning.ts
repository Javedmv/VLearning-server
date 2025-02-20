import { IEnrollmentProgressResult } from "../../../../domain/entities";
import { CategoryModel, EnrollmentProgressModel, User } from "../models";
import { CourseModel } from "../models/courseSchema";

export const courseDetailMyLearning = async (enrollmentId:string,userId:string): Promise<IEnrollmentProgressResult[]> => {
    try {
        const enrollments: IEnrollmentProgressResult[] = await EnrollmentProgressModel.find({ _id:enrollmentId,userId })
        .populate({
            path: "userId",
            model: User // Ensure correct user model
        })
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
        
        console.log(enrollments[0].userId,"enrollments in get courseDetails repo");
        return enrollments as IEnrollmentProgressResult[];
    } catch (error) {
        console.log(error,"error in get courseDetails repo");
        throw new Error("Error in get courseDetailMyLearning repo");
    }
}