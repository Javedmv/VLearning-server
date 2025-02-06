import { CourseModel } from "../models/courseSchema";

export const enrollPaidUser = async (userId: string, courseId: string) => {
    try {
        // Update the course using $addToSet to avoid duplicates
        const course = await CourseModel.findByIdAndUpdate(
            courseId,
            { $addToSet: { students: userId } }, // Ensures unique enrollment
            { new: true }
        );

        if (!course) {
            return { success: false, message: "Course not found." };
        }

        return { success: true, message: "User enrolled successfully." };
    } catch (error: any) {
        console.error("Database error while enrolling user:", error);
        return { success: false, message: "Error enrolling user." };
    }
};
