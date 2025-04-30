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
        let query:any = { role: "instructor" };
    
        // Add search functionality
        if (filters?.search && filters.search.trim() !== '') {
          // Create a case-insensitive search across multiple instructor fields
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
    
        // Count total instructors with the applied filters for pagination
        const totalInstructor = await User.countDocuments(query);
        
        // Execute query with sorting, field selection, and pagination
        const instructorUser = await User.find(query)
          .sort({ createdAt: -1 })
          .select('firstName lastName profession isBlocked email profile.avatar profile.dob profile.gender isVerified cv phoneNumber profileDescription _id username')
          .skip((filters?.page - 1) * filters.limit)
          .limit(filters?.limit);

        return { instructorUser, totalInstructor };
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
    
}