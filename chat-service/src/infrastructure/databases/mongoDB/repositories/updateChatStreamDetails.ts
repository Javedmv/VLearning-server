import { ChatEntity } from "../../../../domain/entities";
import { ChatModel } from "../models";
import { Types } from "mongoose";

export const updateChatStreamDetails = async (
    chatId: string,
    details: {
        wherebyMeetingId: string;
        wherebyRoomUrl: string;
        wherebyHostRoomUrl: string;
        isStreamActive: boolean;
    }
): Promise<ChatEntity.Result | null> => {
    try {
        if (!Types.ObjectId.isValid(chatId)) {
            console.error("Invalid ObjectId format for chatId:", chatId);
            return null; // Or throw an error
        }

        const updatedChat = await ChatModel.findByIdAndUpdate(
            chatId,
            {
                $set: {
                    wherebyMeetingId: details.wherebyMeetingId,
                    wherebyRoomUrl: details.wherebyRoomUrl,
                    wherebyHostRoomUrl: details.wherebyHostRoomUrl,
                    isStreamActive: details.isStreamActive,
                },
            },
            { new: true } // Return the updated document
        ).lean(); // Use lean() for plain JS objects if full Mongoose documents aren't needed

        if (!updatedChat) {
            console.error("Chat not found for update:", chatId);
            return null;
        }

        // Ensure the returned object conforms to ChatEntity.Result if needed
        // Mongoose might return _id as ObjectId, ensure compatibility or transform
        return updatedChat as unknown as ChatEntity.Result; // Adjust casting as needed

    } catch (error: any) {
        console.error("Error updating chat stream details in repository:", error);
        // Consider throwing a custom infrastructure error
        return null;
    }
}; 