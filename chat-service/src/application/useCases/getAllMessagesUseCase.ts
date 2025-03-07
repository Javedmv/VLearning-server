import { IDependencies } from "../interfaces/IDependencies";

export const getAllMessagesUseCase = (dependencies:IDependencies) => {
    const { getAllMessages } = dependencies.repositories
    return {
        execute: async (chatId:string) => {
            try {
                return await getAllMessages(chatId);
            } catch (error:any) {
                console.error("getAllMessage:",error)
                throw new Error(error.message)
            }
        }
    }
}