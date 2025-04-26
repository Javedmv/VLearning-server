import { IDependencies } from "../interfaces/IDependencies";

export const getChatStatusUseCase = (dependencies: IDependencies) => {
   const { getChatStatus } = dependencies.repositories
   return {
      execute: async (chatId: string) => {
         try {
            return await getChatStatus(chatId);
         } catch (error: unknown) {
            if (error instanceof Error) {
               console.error("getChatStatus:", error);
               throw new Error(error.message);
            } else {
               console.error("getChatStatus: An unknown error occurred", error);
               throw new Error("An unknown error occurred");
            }
         }

      }
   }
}