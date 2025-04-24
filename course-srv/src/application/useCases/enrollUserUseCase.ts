import enrollUserProducer from "../../infrastructure/kafka/producers/enrollUserProducer";
import { IDependencies } from "../interfaces/IDependencies";

export const enrollUserUseCase = (dependencies:IDependencies) => {
    const {repositories:{enrollUser }} = dependencies;
    return {
        execute:async(courseId:string,userId:string) => {
            try {
                const {updatedCourse, enrollment} =  await enrollUser(courseId,userId);
                await enrollUserProducer(enrollment,"chat-srv-topic");
                return updatedCourse;
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error(error.message || "Enroll User failed");
                } else {
                    throw new Error("Enroll User failed due to an unknown error");
                }
            }
            
        }
    }
}