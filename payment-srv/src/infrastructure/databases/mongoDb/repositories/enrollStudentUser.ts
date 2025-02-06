import { CourseModel } from "../models";

export const enrollStudentUser = async (courseId: string, userId: string) => {
    try {
        // ** FROM KAFKA OF COURSE SERVICE FOR FREE COURSES **
        // Find the course by ID
          const updatedCourse = await CourseModel.findByIdAndUpdate(
            courseId,
            { $addToSet: { enrolledStudents: userId } },
            { new: true }
        );

        if (!updatedCourse) {
            console.error(`Course with ID ${courseId} not found.`);
            return;
        }

        console.log(`✅ User ${userId} enrolled in course ${courseId}`);
        console.log("User enrolled successfully");
        return;
    } catch (error: any) {
        console.error(error.message, "Error in updating enroll student user in payment service");
    }
};
