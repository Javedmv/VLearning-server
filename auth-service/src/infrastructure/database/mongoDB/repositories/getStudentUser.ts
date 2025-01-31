import { UserEntity } from "../../../../domain/entities";
import { CourseFilters } from "../../../../domain/entities/CourseFilter";
import { User } from "../models";

export const getStudentUser = async(filters:CourseFilters):Promise<any> => {
    try {
        console.log(filters,"in repository")

        const totalStudents = await User.find({ role: "student" }).countDocuments();

        const studentUser = await User.find({ role: "student" })
        .sort({ createdAt: -1 }) 
        .select('firstName lastName profession isBlocked email profile.avatar _id username')
        .skip((filters?.page - 1) * filters.limit)
        .limit(filters?.limit)

        return {studentUser, totalStudents};
    } catch (error:any) {
        throw new Error(error?.message)
    }
}