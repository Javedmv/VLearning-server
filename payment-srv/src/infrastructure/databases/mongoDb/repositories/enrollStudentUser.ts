import { CourseModel } from "../models";

export const enrollStudentUser = async (courseId: string, userId: string) => {
    try {
        // Find the course by ID
        const course = await CourseModel.findById(courseId);
        if (!course) {
            console.error("Course not found");
            return;
        }
        if(!course.students){
            course.students = [];
        }
        // Check if the user is already enrolled
        if (course.students.includes(userId)) {
            console.log("User is already enrolled in the course");
            return;
        }
        // Add user to the students array
        course.students.push(userId);
        await course.save();
        console.log("User enrolled successfully");
    } catch (error: any) {
        console.error(error.message, "Error in updating enroll student user in payment service");
    }
};
