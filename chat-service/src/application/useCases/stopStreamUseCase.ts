import axios from 'axios';
import { IDependencies } from "../interfaces/IDependencies";
import { IStopStreamUseCase } from "../../domain/useCases";
import { Types } from "mongoose";

export const buildStopStreamUseCase = (dependencies: Pick<IDependencies, 'repositories' | 'socketService'>) => {
    const { repositories, socketService } = dependencies;
    const WHEREBY_API_KEY = process.env.WHEREBY_API_KEY;

    if (!WHEREBY_API_KEY) {
        console.error("WHEREBY_API_KEY is not defined in environment variables.");
        // throw new Error("Missing WHEREBY_API_KEY");
    }

    return async (chatId: string, instructorId: string): Promise<{ success: boolean }> => {
        if (!WHEREBY_API_KEY) {
            throw new Error("Whereby API Key is missing. Cannot stop stream.");
        }

        try {
            // Validate chatId
            if (!Types.ObjectId.isValid(chatId)) {
                throw new Error("Invalid Chat ID format.");
            }

            // 1. Get chat details
            const chat = await repositories.getChatById(chatId);

            if (!chat) {
                throw new Error("Chat not found.");
            }

            // 2. Check if a stream is active and get meetingId
            if (!chat.isStreamActive || !chat.wherebyMeetingId) {
                console.log(`No active stream to stop for chat ${chatId}`);
                return { success: true }; // Already stopped or never started
            }

            const meetingId = chat.wherebyMeetingId;

            // 3. Authorization: Verify the request comes from the instructor of this chat
            if (chat.instructorId.toString() !== instructorId) {
                console.warn(`Unauthorized attempt to stop stream for chat ${chatId} by user ${instructorId}`);
                throw new Error("Forbidden: Only the instructor can stop the stream.");
            }

            // 4. Call Whereby API to delete the meeting
            try {
                console.log(`Attempting to delete Whereby meeting: ${meetingId}`);
                await axios.delete(
                    `https://api.whereby.com/v1/meetings/${meetingId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${WHEREBY_API_KEY}`
                        }
                    }
                );
                console.log(`Successfully deleted Whereby meeting: ${meetingId}`);
            } catch (wherebyError: any) {
                // Log Whereby API error but proceed to cleanup DB/notify users
                console.error(`Error deleting Whereby meeting ${meetingId}:`, wherebyError.response?.data || wherebyError.message);
                // Decide if this should prevent DB update/notification (e.g., if room is critical)
                // For now, we proceed to ensure our internal state is cleaned up.
            }

            // 5. Update chat in database (clear details)
            const updatedChat = await repositories.clearChatStreamDetails(chatId);
            if (!updatedChat) {
                 // Log error but maybe still notify?
                 console.error(`Failed to clear stream details in DB for chat ${chatId} after stopping stream.`);
                 // Potentially throw an error here if DB consistency is critical
            }

            // 6. Emit notification
            socketService.emitToRoom(chatId, 'stream-stopped', { chatId });
            console.log(`Emitted 'stream-stopped' event to room ${chatId}`);

            return { success: true };

        } catch (error: any) {
            console.error('Error in stopStreamUseCase:', error.message);
            // Re-throw specific errors (like Forbidden) or wrap others
            if (error.message.startsWith("Forbidden")) {
                 throw error;
            }
            // Consider wrapping other errors
            throw new Error(`Failed to stop stream: ${error.message}`);
        }
    };
}; 