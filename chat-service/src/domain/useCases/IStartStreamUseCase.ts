// Define the expected return type of the execution function
export interface StartStreamResult {
    hostRoomUrl: string;
    meetingId: string;
}

// Define the interface for the USE CASE EXECUTION FUNCTION itself
export type IStartStreamUseCase = 
    (chatId: string, instructorId: string) => Promise<StartStreamResult>; 