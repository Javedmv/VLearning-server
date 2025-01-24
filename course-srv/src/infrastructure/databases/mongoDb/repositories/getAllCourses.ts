import { CourseEntity } from "../../../../domain/entities";
import { CourseModel } from "../models/courseSchema";

export const getAllCourses = async () :Promise<CourseEntity[] | null> => {
    try {
        const courses = await CourseModel.find({})
        .sort({ 'metadata.createdAt': -1 })
        .populate('basicDetails.category')
        .populate("instructor")
        
        return courses as CourseEntity[]
    } catch (error) {
        console.log(error,"error in get all courses repo");
        return Promise.resolve(null);
    }
}