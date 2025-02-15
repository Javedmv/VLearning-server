import mongoose, { Schema, Document, Types } from "mongoose";
import { EnrollmentProgress } from "../../../../domain/entities/index";

const EnrollmentProgressSchema = new Schema<EnrollmentProgress>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "users", required: true, index: true },
        courseId: { type: Schema.Types.ObjectId, ref: "Courses", required: true, index: true },
        enrolledAt: { type: Date, default: Date.now },
        completionPercentage: { type: Number, default: 0 },
        progress: {
            completedLessons: { type: [String], default: [] },
            currentLesson: { type: String, default: "" },
            lessonProgress: {
                type: Map,
                of: new Schema(
                    {
                        totalTimeWatched: { type: Number, default: 0 },
                        lastWatchedPosition: { type: Number, default: 0 },
                        isCompleted: { type: Boolean, default: false },
                    },
                    { _id: false }
                ),
                default: {},
            },
        },
    },
    { timestamps: true }
);

// Create a compound index to optimize user-course progress lookups
EnrollmentProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export const EnrollmentProgressModel = mongoose.model<EnrollmentProgress>("EnrollmentProgress", EnrollmentProgressSchema);