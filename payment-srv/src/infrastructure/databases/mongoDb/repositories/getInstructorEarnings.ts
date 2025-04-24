import { PaymentModel } from "../models";

export const getInstructorEarnings = async (userId:string) => {
    try {
        const instructor = await PaymentModel.find({instructorId:userId})
            .select("amount status createdAt courseId userId instructorEarnings customerEmail instructorId")
            .populate({path: "courseId", model: "Courses", select: "basicDetails students"})
            .populate({path: "userId", model: "users", select: "username email"});

        return instructor;
    } catch (error) {
        console.log("Error getting instructor earnings",error);
        throw new Error("Error getting instructor earnings");
    }
}