import { ChatEntity } from "../../domain/entities";

export interface IRepositories {
    getChatGroup: (courseId:string,userId:string) => Promise<ChatEntity.Result | null>;
}