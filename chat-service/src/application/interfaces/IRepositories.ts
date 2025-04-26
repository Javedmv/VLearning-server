import { ITOBE } from "../../_lib/constants";
import { ChatEntity, MessageEntity } from "../../domain/entities";

export interface IRepositories {
    getChatGroup: (courseId:string,userId:string) => Promise<ChatEntity.Result | null>;
    getAllMessages: (chatId:string) => Promise<MessageEntity.Result[] | null>;
    addNewMessage:(body:MessageEntity.Params) => Promise<MessageEntity.Result | null>;
    getAllInstructorChats:(instructorId: string) => Promise<ChatEntity.Result[] | null>;
    updateChatStreamDetails: (chatId: string, details: { wherebyMeetingId: string; wherebyRoomUrl: string; wherebyHostRoomUrl: string; isStreamActive: boolean }) => Promise<ChatEntity.Result | null>;
    getChatById: (chatId: string) => Promise<ChatEntity.Result | null>;
    clearChatStreamDetails: (chatId: string) => Promise<ChatEntity.Result | null>;

    adminGetAllDashboardData: () => Promise<ITOBE>;
    adminGetPopularCourses: () => Promise<ITOBE>;
    adminGetEnrollmentData: () => Promise<ITOBE>;
}