import { UserEntity } from "../../../../domain/entities";
import { CourseFilters } from "../../../../domain/entities/CourseFilter";
import { User } from "../models";

export interface InstructorUserResult {
    instructorUser: UserEntity[];
    totalInstructor: number;
}

export const getInstructorUser = async(filters: CourseFilters): Promise<any> => {
    try {
        console.log(filters, "filters in repository");
        const totalInstructor = await User.find({ role: "instructor" }).countDocuments();

        const instructorUser = await User.find({ role: "instructor" })
        .sort({ createdAt: -1 })
        .select('firstName lastName profession isBlocked email profile.avatar profile.dob profile.gender isVerified cv phoneNumber profileDescription _id username')
        .skip((filters?.page - 1) * filters.limit)
        .limit(filters?.limit)   

        return { instructorUser, totalInstructor };
    } catch (error: any) {
        throw new Error(error?.message);
    }
}