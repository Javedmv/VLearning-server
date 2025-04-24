import { ITOBE } from "../../../../_lib/constants";
import { ChatModel, CourseModel, EnrollmentProgressModel, MessageModel, User } from "../models";

export const enrollStudentUser = async (enrollmentData: ITOBE) => {
    try {
        const { userId, courseId, firstLessonId } = enrollmentData;
        
        if (!userId || !courseId) {
            return { success: false, message: "Invalid input parameters." };
        }

        // Prevent instructor from enrolling in their own course
        const course = await CourseModel.findById(courseId);
        if (!course) {
            console.error(`Course with ID ${courseId} not found.`);
            return { success: false, message: "Course not found." };
        }

        if (userId === course.instructorId) {
            return { success: false, message: "Instructor cannot enroll in their own course." };
        }

        // Ensure student is added to course's students list
        await CourseModel.findByIdAndUpdate(
            courseId,
            { $addToSet: { students: userId } },
            { new: true, upsert: true }
        );

        // Create or update enrollment progress
        const enrollment = await EnrollmentProgressModel.findOneAndUpdate(
            { userId, courseId },
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
            const user = await User.findById(userId);
            const username = user?.firstName || user?.firstName || "New User";
            
            await MessageModel.create({
                sender: userId,
                content: `${username} has joined the chat`,
                chatId: result._id,
                contentType: "text",
                recieverSeen: [userId],
                type: "newUser"
            });
        }
        

        console.log(`User ${userId} successfully enrolled in chat ${courseId}`);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        console.error("Database error while enrolling user:", message);
        return { success: false, message: "Error enrolling user." };
    }
    
};
