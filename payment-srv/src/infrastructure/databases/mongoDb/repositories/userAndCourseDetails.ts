import { User, CourseModel } from "../models"; // Assuming these are your Mongoose models

export const userAndCourseDetails = async (userId: string, courseId: string): Promise<any> => {
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
    } catch (error: any) {
        console.error(error.message, "Error in fetching user and course details");
    }
};
