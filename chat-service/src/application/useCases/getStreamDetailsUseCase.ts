
import { IDependencies } from "../interfaces/IDependencies";
import { StreamDetailsResult } from "../../domain/useCases";
import { Types } from "mongoose";

export const buildGetStreamDetailsUseCase = (dependencies: Pick<IDependencies, 'repositories'>) => {
   const { repositories } = dependencies;

   return async (chatId: string, userId: string): Promise<StreamDetailsResult> => {
      try {
         // Validate chatId format (optional, repo might handle it)
         if (!Types.ObjectId.isValid(chatId)) {
            console.error("Use Case: Invalid chatId format", chatId);
            return { isActive: false }; // Or throw validation error
         }

         const chat = await repositories.getChatById(chatId);

         if (!chat) {
            console.log(`Use Case: Chat not found for ID ${chatId}`);
            // Depending on requirements, could throw NotFoundError
            return { isActive: false };
         }

         // Optional: Authorization Check - Ensure the requesting user (userId)
         // is part of this chat group (chat.users includes userId)
         // const isUserInChat = chat.users.some(user => user.toString() === userId);
         // if (!isUserInChat && chat.instructorId.toString() !== userId) {
         //     console.warn(`User ${userId} attempted to access stream details for chat ${chatId} they are not part of.`);
         //     throw new Error("Forbidden: You are not part of this chat group."); 
         // }

         if (chat.isStreamActive && chat.wherebyRoomUrl && chat.wherebyMeetingId) {
            console.log(`Use Case: Active stream found for chat ${chatId}`);
            return {
               isActive: true,
               roomUrl: chat.wherebyRoomUrl,
               meetingId: chat.wherebyMeetingId,
            };
         } else {
            console.log(`Use Case: No active stream found for chat ${chatId}`);
            return { isActive: false };
         }

      } catch (error: any) {
         // Handle specific errors like Forbidden error from auth check
         if (error.message.startsWith("Forbidden")) {
            throw error; // Re-throw auth errors for controller to handle
         }
         console.error('Error in getStreamDetailsUseCase:', error.message);
         // Don't expose internal errors directly, return a generic state or throw specific use case error
         return { isActive: false }; // Default to inactive on unexpected errors
      }
   };
};
