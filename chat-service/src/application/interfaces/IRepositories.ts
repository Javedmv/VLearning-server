import { ChatEntity, MessageEntity } from "../../domain/entities";

export interface IRepositories {
    getChatGroup: (courseId:string,userId:string) => Promise<ChatEntity.Result | null>;
    getAllMessages: (chatId:string) => Promise<MessageEntity.Result[] | null>;
    addNewMessage:(body:MessageEntity.Params) => Promise<MessageEntity.Result | null>;
    getAllInstructorChats:(instructorId: string) => Promise<ChatEntity.Result[] | null>;
}