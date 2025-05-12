import { CourseModel } from "../models";

export const enrollStudentInCourse = async (userId: string, courseId: string): Promise<boolean> => {
    try {
        // **FROM PAID COURSES**
        console.log("Enrolling student in course.... repo", userId, courseId);
        const updatedCourse = await CourseModel.findByIdAndUpdate(
            courseId,
            { $addToSet: { students: userId } },
            { new: true }
        );

        if (!updatedCourse) {
            console.error(`Course with ID ${courseId} not found. in enrollStudentInCourse repo`);
            return false;
        }

        console.log(`✅ User ${userId} enrolled in course ${courseId} successfully. enrollStudentInCourse repo`);
        return true;
    } catch (error) {
        console.error("❌ Error enrolling student in course:", error);
        return false;
    }
};
