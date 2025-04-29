import { TOBE } from "../../../../_lib/utils/Tobe";
import { UserEntity } from "../../../../domain/entities";
import { CourseFilters } from "../../../../domain/entities/CourseFilter";
import { User } from "../models";

export interface InstructorUserResult {
    instructorUser: UserEntity[];
    totalInstructor: number;
}

export const getInstructorUser = async(filters: CourseFilters): Promise<TOBE> => {
    try {
        const totalInstructor = await User.find({ role: "instructor" }).countDocuments();

        const instructorUser = await User.find({ role: "instructor" })
        .sort({ createdAt: -1 })
        .select('firstName lastName profession isBlocked email profile.avatar profile.dob profile.gender isVerified cv phoneNumber profileDescription _id username')
        .skip((filters?.page - 1) * filters.limit)
        .limit(filters?.limit)   

        return { instructorUser, totalInstructor };
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
    
}