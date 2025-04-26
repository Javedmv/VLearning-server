import axios from 'axios';
import { IDependencies } from "../interfaces/IDependencies";

// Define the structure expected from the Whereby API response
interface WherebyMeetingResponse {
   meetingId: string;
   roomUrl: string;
   hostRoomUrl: string;
   // Add other fields if necessary
}

export const buildStartStreamUseCase = (dependencies: Pick<IDependencies, 'repositories' | 'socketService'>) => {
   const { repositories, socketService } = dependencies;
   const WHEREBY_API_KEY = process.env.WHEREBY_API_KEY;

   if (!WHEREBY_API_KEY) {
      console.error("WHEREBY_API_KEY is not defined in environment variables.");
      // Optionally throw an error to prevent the use case from being built
      // throw new Error("Missing WHEREBY_API_KEY");
   }

   return async (chatId: string, instructorId: string /* Assuming instructorId is available */) => {
      if (!WHEREBY_API_KEY) {
         throw new Error("Whereby API Key is missing. Cannot start stream.");
      }

      try {
         // Optional: Verify instructor is part of this chat if needed
         // const chat = await repositories.getChatGroup(chatId, instructorId); // Modify getChatGroup if needed
         // if (!chat || chat.instructorId.toString() !== instructorId) {
         //     throw new Error("Instructor not authorized for this chat or chat not found.");
         // }

         console.log(`Attempting to create Whereby meeting for chat: ${chatId}`);
         
         const response = await axios.post<WherebyMeetingResponse>(
            'https://api.whereby.dev/v1/meetings',
            {
               endDate: "2099-02-18T14:23:00.000Z",
               isLocked: true, // Example: Lock the room by default
               roomNamePattern: 'uuid', // Use UUID for unique room names
               fields: ['hostRoomUrl'] // Request hostRoomUrl field
            },
            {
               headers: {
                  'Authorization': `Bearer ${WHEREBY_API_KEY}`,
                  'Content-Type': 'application/json'
               }
            }
         );

         
         const { meetingId, roomUrl, hostRoomUrl } = response.data;

         if (!meetingId || !roomUrl || !hostRoomUrl) {
            console.error("Invalid response from Whereby API:", response.data);
            throw new Error('Failed to create Whereby meeting: Invalid API response.');
         }

         console.log(`Whereby meeting created: ${meetingId}, Host URL: ${hostRoomUrl}`);

         // Update chat in database
         const updatedChat = await repositories.updateChatStreamDetails(chatId, {
            wherebyMeetingId: meetingId,
            wherebyRoomUrl: roomUrl,
            wherebyHostRoomUrl: hostRoomUrl,
            isStreamActive: true
         });

         if (!updatedChat) {
            // Attempt to delete the created Whereby room if DB update fails?
            // Requires Whereby DELETE /meetings/{meetingId} endpoint call
            console.error(`Failed to update chat ${chatId} with stream details after creating meeting ${meetingId}.`);
            throw new Error('Failed to save stream details to the chat.');
         }

         console.log(`Chat ${chatId} updated with stream details.`);

         // Emit notification to the chat room
         socketService.emitToRoom(chatId, 'stream-started', {
            meetingId,
            roomUrl, // Send viewer URL to clients
            chatId,
            // Add any other relevant info
         });
         console.log(`Emitted 'stream-started' event to room ${chatId}`);

         // Return host URL and meeting ID to the instructor
         return { hostRoomUrl, meetingId };

      } catch (error: any) {
         
         console.error('Error in startStreamUseCase:', error.response?.data || error.message);
         // More specific error handling based on axios error structure
         if (axios.isAxiosError(error)) {
            throw new Error(`Whereby API Error: ${error.response?.status} ${error.response?.data?.message || error.message}`);
         }
         throw new Error('An unexpected error occurred while starting the stream.');
      }
   };
}; 