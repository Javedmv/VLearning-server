import { CourseModel } from "../models/courseSchema";

export const enrollPaidUser = async (userId: string, courseId: string) => {
    try {
        if (!userId || !courseId) {
            console.error("Invalid input: userId or courseId is missing.");
            return { success: false, message: "Invalid input parameters." };
        }

        // Update the course using $addToSet to avoid duplicate student entries
        const updatedCourse = await CourseModel.findByIdAndUpdate(
            courseId,
            { $addToSet: { students: userId } },
            { new: true } // Returns the updated document
        );

        console.log(`User ${userId} attempting to enroll in course ${courseId}`);

        if (!updatedCourse) {
            console.error(`Course with ID ${courseId} not found.`);
            return { success: false, message: "Course not found." };
        }

        console.log(`User ${userId} successfully enrolled in course ${courseId}`);
        return { success: true, message: "User enrolled successfully.", course: updatedCourse };

    } catch (error: any) {
        console.error("Database error while enrolling user:", error.message);
        return { success: false, message: "Error enrolling user." };
    }
};
