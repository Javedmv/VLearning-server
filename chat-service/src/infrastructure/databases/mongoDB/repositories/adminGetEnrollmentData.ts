import { EnrollmentProgressModel } from "../models";

export const adminGetEnrollmentData = async () => {
    try {
        const enrollmentData = await EnrollmentProgressModel.find({})
        .select("courseId userId")
        .populate({path: "courseId", select: "basicDetails"})
        .populate({path: "userId", select: "username"})
        .sort({createdAt: -1})
        .limit(3)
        return enrollmentData;
    } catch (error) {
        throw new Error("Error getting enrollment data");
    }
}