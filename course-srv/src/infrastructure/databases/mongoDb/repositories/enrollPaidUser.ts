import { EnrollmentProgressModel } from "../models";
import { CourseModel } from "../models/courseSchema";

export const enrollPaidUser = async (userId: string, courseId: string) => {
    try {
        if (!userId || !courseId) {
            console.error("Invalid input: userId or courseId is missing.");
            return { success: false, message: "Invalid input parameters." };
        }

        // Update the course using $addToSet to avoid duplicate student entries
        const updatedCourse = await CourseModel.findByIdAndUpdate(
            courseId,
            { $addToSet: { students: userId } },
            { new: true } // Returns the updated document
        );

        if (!updatedCourse) {
            console.error(`Course with ID ${courseId} not found.`);
            return { success: false, message: "Course not found." };
        }

        console.log(`User ${userId} successfully enrolled in course ${courseId}`);

        // ✅ Get the first lesson ID safely
        const firstLesson = updatedCourse.courseContent?.lessons?.[0];
        const firstLessonId = firstLesson?._id ? firstLesson._id.toString() : "";

        // ✅ Create Enrollment Progress if not exists
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

        return { 
            success: true, 
            message: "User enrolled successfully.", 
            updatedCourse, 
            enrollment 
        };

    } catch (error: any) {
        console.error("Database error while enrolling user:", error.message);
        return { success: false, message: "Error enrolling user." };
    }
};
