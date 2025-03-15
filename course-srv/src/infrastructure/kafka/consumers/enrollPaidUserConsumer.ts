import { enrollPaidUser } from "../../databases/mongoDb/repositories/enrollPaidUser";
import enrollUserProducer from "../producers/enrollUserProducer";

export default async ({userId,courseId}:{userId:string,courseId:string}) => {
    try {
        if (!userId || !courseId) {
            throw new Error("Invalid userId or courseId");
        }

        const {success, enrollment, message} = await enrollPaidUser(userId, courseId);
        

        if(success && enrollment){
            await enrollUserProducer(JSON.stringify(enrollment), "chat-srv-topic");
        }

        if (!success) {
            throw new Error(message);
        }

        console.log(`enrollPaidUserConsumer :-✅ User ${userId} enrolled in course ${courseId}`);
        // return { success: true, message: "User enrolled successfully." };
    } catch (error: any) {
        console.error("Error enrollPaidUserConsumer :", error);
        // return { success: false, message: error.message || "Error enrolling user." };
    }
};
