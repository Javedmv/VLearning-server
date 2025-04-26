// Define the interface for the USE CASE EXECUTION FUNCTION itself
export type IStopStreamUseCase = 
    (chatId: string, instructorId: string) => Promise<{ success: boolean }>; 