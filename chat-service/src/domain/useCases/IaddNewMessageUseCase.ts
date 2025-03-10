import { MessageEntity } from "../entities";

export interface IaddNewMessageUseCase {
    execute(body:MessageEntity.Params) : Promise<MessageEntity.Result | null>
}