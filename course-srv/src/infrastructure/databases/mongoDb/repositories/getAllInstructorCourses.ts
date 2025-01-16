import { CourseEntity } from "../../../../domain/entities";
import { CourseModel } from "../models/courseSchema";

export const getAllInstructorCourses = async(instrId:string):Promise<CourseEntity[] | null> => {
    try {
        const courses = await CourseModel.find({instructorId:instrId})
        .sort({ createdAt: -1 })
        .populate('instructor')
        .populate('basicDetails.category')

        return courses as CourseEntity[]
    } catch (error) {
        console.log(error,"error in get all instructor repo");
        return Promise.resolve(null);
    }
}