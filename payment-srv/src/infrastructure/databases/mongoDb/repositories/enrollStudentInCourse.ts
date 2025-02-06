import { CourseModel } from "../models";

export const enrollStudentInCourse = async (userId: string, courseId: string): Promise<boolean> => {
    try {
        // **FROM PAID COURSES**

        const updatedCourse = await CourseModel.findByIdAndUpdate(
            courseId,
            { $addToSet: { enrolledStudents: userId } },
            { new: true }
        );

        if (!updatedCourse) {
            console.error(`Course with ID ${courseId} not found.`);
            return false;
        }

        console.log(`✅ User ${userId} enrolled in course ${courseId}`);
        return true;
    } catch (error) {
        console.error("❌ Error enrolling student in course:", error);
        return false;
    }
};
