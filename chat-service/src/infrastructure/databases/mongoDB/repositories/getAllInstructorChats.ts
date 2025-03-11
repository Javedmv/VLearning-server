import { IDependencies } from "../../../../application/interfaces/IDependencies";
import { ChatEntity } from "../../../../domain/entities";
import { ChatModel } from "../models";

export const getAllInstructorChats = async (instructorId: string): Promise<ChatEntity.Result[] | null> => {
    try {
        const chats = await ChatModel.find({instructorId:instructorId});
        return chats as ChatEntity.Result[];
    } catch (error) {
        throw new Error("failed to fetch getAllInstructorChats in repo")
    }
}