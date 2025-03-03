import { CourseModel } from "../models";

export const enrollStudentUser = async (courseId: string, userId: string) => {
    try {
        if (!userId || !courseId) {
            console.error("Invalid input: userId or courseId is missing.");
            return { success: false, message: "Invalid input parameters." };
        }

        // Prevent instructor from enrolling in their own course
        const course = await CourseModel.findById(courseId);
        if (!course) {
            console.error(`Course with ID ${courseId} not found.`);
            return { success: false, message: "Course not found." };
        }

        if (userId === course.instructorId) {
            console.log("Instructor is attempting to enroll in their own course.");
            return { success: false, message: "Instructor cannot enroll in their own course." };
        }

        // Use $addToSet to add userId only if it doesn't already exist
        const updatedCourse = await CourseModel.findByIdAndUpdate(
            courseId,
            { $addToSet: { students: userId } }, // Ensures no duplicate entries
            { new: true, upsert: true } // upsert ensures students array is created if missing
        );

        if (!updatedCourse) {
            return { success: false, message: "Failed to enroll user." };
        }

        console.log(`User ${userId} successfully enrolled in course ${courseId}`);
        return { success: true, message: "User enrolled successfully.", course: updatedCourse };

    } catch (error: any) {
        console.error("Database error while enrolling user:", error.message);
        return { success: false, message: "Error enrolling user." };
    }
};
