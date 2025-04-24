import { TOBE } from "../../../../_lib/common/Tobe";
import { LessonObject } from "../../../../presentation/controllers/courseController/postupdatedWatched";
import { EnrollmentProgressModel } from "../models";

export const updateProgress = async (
  enrollmentId: string,
  lessonObject: LessonObject,
  allLessons: LessonObject[]
) => {
  try {
    const currentLessonIndex = allLessons.findIndex(
      (lesson) => lesson._id.toString() === lessonObject._id.toString()
    );

    // Determine the next lesson
    const nextLesson = allLessons[currentLessonIndex + 1];

    // Update progress: always add the current lesson to completedLessons
    const updateQuery: TOBE = {
      $addToSet: { "progress.completedLessons": lessonObject._id }
    };

    // If there's a next lesson, update currentLesson to the next lesson
    if (nextLesson) {
      updateQuery.$set = { "progress.currentLesson": nextLesson._id };
    } 
    // If no next lesson, update currentLesson to the first lesson
    else if (allLessons.length > 0) {
      updateQuery.$set = { "progress.currentLesson": allLessons[0]._id };
      updateQuery.$set = { "progress.completionPercentage" : 1}
    }

    // Update the enrollment progress
    const updatedEnrollment = await EnrollmentProgressModel.findByIdAndUpdate(
      enrollmentId,
      updateQuery,
      { new: true } // Returns the updated document
    );

    if (!updatedEnrollment) {
      throw new Error("Enrollment not found");
    }

    return updatedEnrollment;
  } catch (error: unknown) {
    if (error instanceof Error) {
        console.error("ERROR IN updateProgress REPO", error);
    } else {
        console.error("ERROR IN updateProgress REPO: An unknown error occurred");
    }
    throw new Error("Error in updateProgress repo");
}

};
