import { MessageEntity } from "../../../../domain/entities";
import { MessageModel } from "../models";

export const getAllMessages = async (chatId: string): Promise<MessageEntity.Result[] | null> => {
    try {
        const messages = await MessageModel.find({ chatId })
            .populate('sender', 'username _id firstName lastName profile.avatar')
            .sort({ createdAt: 1 })
        
        return messages
    } catch (error) {
        console.error("Error in getAllMessages:", error);
        return null;
    }
};
