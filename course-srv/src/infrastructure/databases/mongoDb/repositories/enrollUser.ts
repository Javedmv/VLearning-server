import { CourseEntity } from "../../../../domain/entities";
import { EnrollmentProgressModel } from "../models";
import { CourseModel } from "../models/courseSchema";

export const enrollUser = async (courseId: string, userId: string): Promise<any> => {
  try {
    // Find and update the course in one atomic operation
    const updatedCourse = await CourseModel.findByIdAndUpdate(
      courseId,
      {
        $addToSet: { students: userId }, // Prevents duplicate entries
      },
      { new: true }
    );

    if (!updatedCourse) {
      console.error(`Course with ID ${courseId} not found`);
      return null;
    }

    // Prevent instructor from enrolling as a student
    if (userId === updatedCourse.instructorId.toString()) {
      console.log("Instructor is enrolling in their own course, FROM REPOSITORY ENROLLUSER");
    }

    // ✅ Get the first lesson safely
    const firstLesson = updatedCourse.courseContent?.lessons?.[0];
    const firstLessonId = firstLesson?._id ? firstLesson._id.toString() : "";

    // 💡 Initialize Enrollment Progress when the user enrolls
    const enrollment = await EnrollmentProgressModel.findOneAndUpdate(
      { userId, courseId }, // Search for existing progress
      {
        $setOnInsert: {
          userId,
          courseId,
          enrolledAt: new Date(),
          completionPercentage: 0,
          progress: {
            completedLessons: [],
            currentLesson: firstLessonId, // Set first lesson as current
            lessonProgress: {},
          },
        },
      },
      { upsert: true, new: true }
    );

    return {updatedCourse, enrollment};
  } catch (error) {
    console.error(error, "Error in enrollUser repository");
    return null;
  }
};
