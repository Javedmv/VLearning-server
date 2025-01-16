import { CourseEntity } from "../../../../domain/entities";
import { CourseModel } from "../models/courseSchema";

export const getCourseDetails = async(courseId:string): Promise<CourseEntity | null> => {
    try {
        const course = await CourseModel.findOne({_id:courseId})
        .populate('instructor')
        .populate('basicDetails.category')

        return course as CourseEntity;
    } catch (error) {
        console.log(error,"error in get courseDetails repo");
        return Promise.resolve(null);
    }
}