import { enrollPaidUser } from "../../databases/mongoDb/repositories/enrollPaidUser";

export default async (userId: string, courseId: string) => {
    try {
        if (!userId || !courseId) {
            throw new Error("Invalid userId or courseId");
        }

        const result = await enrollPaidUser(userId, courseId);

        if (!result.success) {
            throw new Error(result.message);
        }

        console.log(`enrollPaidUserConsumer :-✅ User ${userId} enrolled in course ${courseId}`);
        // return { success: true, message: "User enrolled successfully." };
    } catch (error: any) {
        console.error("Error enrollPaidUserConsumer :", error);
        // return { success: false, message: error.message || "Error enrolling user." };
    }
};
