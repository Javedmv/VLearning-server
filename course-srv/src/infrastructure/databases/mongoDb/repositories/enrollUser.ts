import { CourseEntity } from "../../../../domain/entities";
import { CourseModel } from "../models/courseSchema";

export const enrollUser = async (courseId: string, userId: string): Promise<CourseEntity | null> => {
  try {
    const course = await CourseModel.findById(courseId);

    if (!course) {
      console.error(`Course with ID ${courseId} not found`);
      return null;
    }

    // Ensure 'students' array is initialized
    if (!course.students) {
      course.students = [];
    }
    if(userId === course.instructorId){
        console.log("both id are same");
        return course;
    }

    // Check if the user is already enrolled
    const isAlreadyEnrolled = course.students.find((studentId) => studentId === userId);
    
    if (isAlreadyEnrolled) {
      console.log(`User with ID ${userId} is already enrolled in course ${courseId}`);
      return course;
    }

    // Add the user to the students array
    course.students.push(userId);

    // Save the updated course
    const updatedCourse = await course.save();

    return updatedCourse;
  } catch (error) {
    console.error(error, "Error in enrollUser repository");
    return null;
  }
};
