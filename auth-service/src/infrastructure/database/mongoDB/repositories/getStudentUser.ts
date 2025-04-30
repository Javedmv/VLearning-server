import { TOBE } from "../../../../_lib/utils/Tobe";
import { UserEntity } from "../../../../domain/entities";
import { CourseFilters } from "../../../../domain/entities/CourseFilter";
import { User } from "../models";

export const getStudentUser = async(filters:CourseFilters):Promise<TOBE> => {
    try {
        const totalStudents = await User.find({ role: "student" }).countDocuments();
        let query:any = { role: "student" };

        if (filters?.search && filters.search.trim() !== '') {
            // Create a case-insensitive search across multiple fields
            query = {
              ...query,
              $or: [
                { firstName: { $regex: filters.search, $options: 'i' } },
                { lastName: { $regex: filters.search, $options: 'i' } },
                { email: { $regex: filters.search, $options: 'i' } },
                { username: { $regex: filters.search, $options: 'i' } },
              ]
            };
          }

        const studentUser = await User.find(query)
        .sort({ createdAt: -1 }) 
        .select('firstName lastName profession isBlocked email profile.avatar _id username')
        .skip((filters?.page - 1) * filters.limit)
        .limit(filters?.limit)

        return {studentUser, totalStudents};
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
    
}