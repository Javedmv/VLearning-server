import { CourseEntity } from "../../../../domain/entities";
import { CourseModel } from "../models/courseSchema";

export const getAllInstructorCourses = async(instrId:string):Promise<CourseEntity[] | null> => {
    try {
        const courses = await CourseModel.find({instructorId:instrId})
        .sort({ createdAt: -1 })
        .populate('instructor')
        .populate('basicDetails.category')

        console.log(courses,"no insturctor details");

        return courses as CourseEntity[]
    } catch (error) {
        console.log(error,"error in category get repo");
        return Promise.resolve(null);
    }
}