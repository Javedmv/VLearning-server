import { Types } from "mongoose";

export interface EnrollmentProgress {
    userId: Types.ObjectId | string;
    courseId: Types.ObjectId | string;
    enrolledAt: Date;
    completionPercentage: number; // Use number for calculations
    progress: {
        completedLessons: string[];
        currentLesson: string;
        lessonProgress: {
            [lessonId: string]: {
                totalTimeWatched: number; // Store in seconds for easy calculations
                lastWatchedPosition: number; // Store in seconds for accurate tracking
                isCompleted: boolean;
            };
        };
    };
} 
