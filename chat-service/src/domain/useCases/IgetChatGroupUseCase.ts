import { ChatEntity } from "../entities";

export interface IgetChatGroupUseCase {
    execute(courseId:string, userId:string) : Promise<ChatEntity.Result | null> 
}