import { ChatModel, EnrollmentProgressModel, MessageModel } from "../models";
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
        const firstLesson : any = updatedCourse.courseContent?.lessons?.[0];
        const firstLessonId = firstLesson?._id ? firstLesson._id.toString() : "";

        // ✅ Create Enrollment Progress if not exists
        await EnrollmentProgressModel.findOneAndUpdate(
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

        const result = await ChatModel.findOneAndUpdate(
            { courseId },
            { $addToSet: { users: userId } },
            { new: true }
        );
        
        if (result) {
            await MessageModel.create({
                sender: userId,
                content: "New user has been added",
                chatId: result._id,
                contentType: "text",
                recieverSeen: [userId],
                type: "newUser"
            });
        }

        return { success: true, message: "User enrolled successfully.", course: updatedCourse };

    } catch (error: any) {
        console.error("Database error while enrolling user:", error.message);
        return { success: false, message: "Error enrolling user." };
    }
};
