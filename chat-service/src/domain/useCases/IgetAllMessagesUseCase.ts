import { MessageEntity } from "../entities";

export interface IgetAllMessagesUseCase {
    execute(chatId:string) : Promise<MessageEntity.Result[] | null>
}