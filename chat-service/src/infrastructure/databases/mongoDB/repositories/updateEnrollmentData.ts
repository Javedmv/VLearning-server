import { ITOBE } from "../../../../_lib/constants";
import { EnrollmentProgressModel } from "../models";
import { CourseModel } from "../models/courseSchema";

export const updateEnrollmentData = async (enrollmentData: ITOBE) => {
    try {
        const { userId, courseId, completionPercentage, progress } = enrollmentData;

        if (!userId || !courseId) {
            console.error("Invalid input: userId or courseId is missing.");
            return { success: false, message: "Invalid input parameters." };
        }

        const existingEnrollment = await EnrollmentProgressModel.findOne({ userId, courseId });

        // Merge new data with existing progress
        const updatedEnrollment = await EnrollmentProgressModel.findOneAndUpdate(
            { userId, courseId },
            {
                $set: {
                    completionPercentage: completionPercentage ?? existingEnrollment?.completionPercentage ?? 0,
                    "progress.completedLessons": progress?.completedLessons || existingEnrollment?.progress?.completedLessons || [],
                    "progress.currentLesson": progress?.currentLesson || existingEnrollment?.progress?.currentLesson || "",
                    "progress.lessonProgress": progress?.lessonProgress || existingEnrollment?.progress?.lessonProgress || {},
                },
            },
            { upsert: true, new: true }
        );

        return { success: true, message: "Enrollment data updated successfully.", updatedEnrollment };

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Database error while updating enrollment:", error.message);
            return { success: false, message: "Error updating enrollment data." };
        } else {
            console.error("Unknown error while updating enrollment:", error);
            return { success: false, message: "An unknown error occurred while updating enrollment data." };
        }
    }    
};
