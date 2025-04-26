import { ChatEntity } from "../entities";

// Define the expected return type
export interface StreamDetailsResult {
    isActive: boolean;
    roomUrl?: string;
    meetingId?: string;
}

// Define the interface for the USE CASE EXECUTION FUNCTION itself
export type IGetStreamDetailsUseCase =
    (chatId: string, userId: string) => Promise<StreamDetailsResult>; 