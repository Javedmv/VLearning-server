import { ChatEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const getChatGroupUseCase = (dependencies:IDependencies) => {
    const {repositories : {getChatGroup}} = dependencies
    return {
        execute: async (courseId:string,userId:string): Promise<ChatEntity.Result | null> => {
            try {
                return await getChatGroup(courseId,userId);
            } catch (error) {
                console.log("ERROR: getChatGroupUseCase =", error)
                throw new Error("Failed to get chat group");
            }
        }
    }
}