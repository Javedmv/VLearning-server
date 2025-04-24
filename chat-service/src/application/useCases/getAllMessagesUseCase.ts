import { IDependencies } from "../interfaces/IDependencies";

export const getAllMessagesUseCase = (dependencies:IDependencies) => {
    const { getAllMessages } = dependencies.repositories
    return {
        execute: async (chatId:string) => {
            try {
                return await getAllMessages(chatId);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error("getAllMessage:", error);
                    throw new Error(error.message);
                } else {
                    console.error("getAllMessage: An unknown error occurred", error);
                    throw new Error("An unknown error occurred");
                }
            }
            
        }
    }
}