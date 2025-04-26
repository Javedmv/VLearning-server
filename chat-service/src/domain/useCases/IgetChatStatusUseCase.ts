import { ChatEntity } from "../entities";

export interface IgetChatStatusUseCase {
    execute(chatId:string) : Promise<ChatEntity.Result | null> 
}     