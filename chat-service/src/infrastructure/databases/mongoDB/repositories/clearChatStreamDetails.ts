import { ChatEntity } from "../../../../domain/entities";
import { ChatModel } from "../models";
import { Types } from "mongoose";

export const clearChatStreamDetails = async (
    chatId: string
): Promise<ChatEntity.Result | null> => {
    try {
        if (!Types.ObjectId.isValid(chatId)) {
            console.error("Invalid ObjectId format for chatId:", chatId);
            return null;
        }

        // Update the chat, setting stream to inactive and clearing Whereby fields
        const updatedChat = await ChatModel.findByIdAndUpdate(
            chatId,
            {
                $set: {
                    isStreamActive: false,
                },
                $unset: { // Remove the fields entirely
                    wherebyMeetingId: "",
                    wherebyRoomUrl: "",
                    wherebyHostRoomUrl: "",
                }
            },
            { new: true } // Return the updated document
        ).lean();

        if (!updatedChat) {
            console.error("Chat not found for clearing stream details:", chatId);
            return null;
        }

        console.log(`Cleared stream details for chat: ${chatId}`);
        return updatedChat as unknown as ChatEntity.Result; // Adjust casting as needed

    } catch (error: any) {
        console.error("Error clearing chat stream details in repository:", error);
        return null;
    }
}; 