import mongoose from "mongoose";
import { ChatEntity } from "../../../../domain/entities";
import { ChatModel } from "../models";

export const getChatGroup = async (courseId: string, userId: string): Promise<ChatEntity.Result | null> => {
    try {
        const chatGroup = await ChatModel.findOne({
            courseId: new mongoose.Types.ObjectId(courseId),
            users: new mongoose.Types.ObjectId(userId),
        }).populate({
            path: "users",
            select: "firstName lastName username email profile.avatar phoneNumber _id",
        });
        
        console.log(chatGroup)
        if (!chatGroup) {
            console.log("No chat group found for the given courseId and userId.");
            return null;
        }
        return chatGroup;
    } catch (error) {
        console.error("ERROR: getChatGroupREPO =", error);
        throw new Error("Failed to fetch chat group");
    }
};
