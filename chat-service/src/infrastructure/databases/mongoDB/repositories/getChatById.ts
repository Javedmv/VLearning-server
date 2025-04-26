import { ChatEntity } from "../../../../domain/entities";
import { ChatModel } from "../models";
import { Types } from "mongoose";

export const getChatById = async (
   chatId: string
): Promise<ChatEntity.Result | null> => {
   try {
      if (!Types.ObjectId.isValid(chatId)) {
         console.error("Invalid ObjectId format for chatId:", chatId);
         return null;
      }

      const chat = await ChatModel.findById(chatId)
         // Optionally populate other fields if needed later
         // .populate('users')
         // .populate('latestMessage')
         .lean(); // Use lean for plain JS object

      if (!chat) {
         console.log(`Chat not found with ID: ${chatId}`);
         return null;
      }

      // Ensure the returned object conforms to ChatEntity.Result if needed
      return chat as unknown as ChatEntity.Result; // Adjust casting as needed

   } catch (error: any) {
      console.error("Error fetching chat by ID in repository:", error);
      // Consider throwing a custom infrastructure error
      return null;
   }
};