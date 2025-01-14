import { CourseEntity } from "../../../../domain/entities";
import { CourseModel } from "../models/courseSchema";

export const getAllCourses = async () :Promise<CourseEntity[] | null> => {
    try {
        const courses = await CourseModel.find({})
        .sort({ createdAt: -1 })
        .populate('basicDetails.category')
        .populate("instructor")
        return courses as CourseEntity[]
    } catch (error) {
        console.log(error,"error in category get repo");
        return Promise.resolve(null);
    }
}