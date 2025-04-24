import { TOBE } from "../../../../_lib/common/Tobe";
import { CourseEntity } from "../../../../domain/entities";
import { CourseFilters } from "../../../../domain/entities/CourseFilter";
import { CourseModel } from "../models/courseSchema";

export const getAllInstructorCourses = async(instrId:string,filters:CourseFilters):Promise<TOBE> => {
    try {
        const totalCourses = await CourseModel.find({instructorId:instrId}).countDocuments();

        const courses = await CourseModel.find({instructorId:instrId})
        .sort({ createdAt: -1 })
        .skip((filters?.page - 1) * filters.limit)
        .limit(filters?.limit)
        .populate('instructor')
        .populate('basicDetails.category')

        return {courses ,total:totalCourses};
    } catch (error) {
        console.log(error,"error in get all instructor repo");
        return Promise.resolve(null);
    }
}