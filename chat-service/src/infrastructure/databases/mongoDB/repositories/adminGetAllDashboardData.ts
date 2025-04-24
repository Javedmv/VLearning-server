import { CourseModel, User } from "../models";

export const adminGetAllDashboardData = async () => {
    try {
        const courseCount = await CourseModel.countDocuments({});
        const instructorCount = await User.countDocuments({role: "instructor"});
        const studentCount = await User.countDocuments({role: "student"});

        return {courseCount,instructorCount,studentCount};
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error in adminGetAllCourses repository:", error.message);
            throw new Error("Error getting all courses");
        } else {
            console.error("Unknown error in adminGetAllCourses repository:", error);
            throw new Error("Unexpected error getting all courses");
        }
    }
    
}   