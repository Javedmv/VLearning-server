import { TOBE } from "../../../../_lib/common/Tobe";
import { EnrollmentProgressModel } from "../models";
import mongoose from "mongoose";
// Define the return type more specifically if possible
export const getEnrollment = async (enrollmentId: string): Promise<TOBE> => {
    try {
        // Validate the enrollmentId format before querying
        if (!enrollmentId || !mongoose.Types.ObjectId.isValid(enrollmentId)) {
            throw new Error("Invalid enrollment ID format");
        }

        const enrollment = await EnrollmentProgressModel.findById(enrollmentId)
            .populate({
                path: "courseId",
                select: "basicDetails",
            })
            .populate({
                path: "userId",
                select: "firstName lastName",
            })
            .lean() // Convert to plain JavaScript object
            .exec();

        if (!enrollment) {
            throw new Error("Enrollment not found");
        }

        return enrollment;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || "Failed to fetch enrollment");
        } else {
            throw new Error("Failed to fetch enrollment due to an unknown error");
        }
    }
    
};