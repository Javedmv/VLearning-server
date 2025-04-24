import { PTobe } from "../../../../_lib/constants/Tobe";
import { User, CourseModel } from "../models"; // Assuming these are your Mongoose models

export const userAndCourseDetails = async (userId: string, courseId: string): Promise<PTobe> => {
    try {
        // Fetch user details
        const user = await User.findById(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }

        // Fetch course details
        const course = await CourseModel.findById(courseId);
        if (!course) {
            throw new Error(`Course with ID ${courseId} not found`);
        }

        // Return combined data
        return {
            user,
            course,
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message, "Error in fetching user and course details");
        } else {
            console.error("Unknown error occurred while fetching user and course details");
        }
    }
    
};
