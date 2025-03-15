import { PaymentModel } from "../models";

export const getAdminEarnings = async () => {
    try {
        const admin = await PaymentModel.find({})
            .select("amount status createdAt courseId userId instructorEarnings customerEmail instructorId adminEarnings paymentIntentId receiptUrl")
            .populate({path: "courseId", model: "Courses", select: "basicDetails students"})
            .populate({
                path: "userId", 
                model: "users",
                select: "username email",
                options: { retainNullValues: true }
            });

        return admin;
    } catch (error) {
        console.log("Error getting admin earnings", error);
        throw new Error("Error getting admin earnings");
    }
}