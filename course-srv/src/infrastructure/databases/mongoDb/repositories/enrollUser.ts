import { CourseEntity } from "../../../../domain/entities";
import { CourseModel } from "../models/courseSchema";

export const enrollUser = async (courseId: string, userId: string): Promise<CourseEntity | null> => {
  try {
    // Find and update the course in one atomic operation
    const updatedCourse = await CourseModel.findByIdAndUpdate(
      courseId,
      {
        $addToSet: { students: userId }, // Prevents duplicate entries
      },
      { new: true } // Returns the updated document
    );

    if (!updatedCourse) {
      console.error(`Course with ID ${courseId} not found`);
      return null;
    }

    // Prevent instructor from enrolling as a student
    if (userId === updatedCourse.instructorId) {
      console.log("Instructor is enrolling in his course, FROM REPOSITORY ENROLLUSER");
    }

    return updatedCourse;
  } catch (error) {
    console.error(error, "Error in enrollUser repository");
    return null;
  }
};
