import { IDependencies } from "../interfaces/IDependencies";

export const getAllInstructorChatsUseCase = (dependencies:IDependencies) => {
    const {repositories:{getAllInstructorChats}} = dependencies
    return {
        execute: async (instructorId:string) => {
            try {
                return await getAllInstructorChats(instructorId)
            } catch (error) {
                throw new Error("failed to fetch all instructor chats")
            }
        }
    }
}