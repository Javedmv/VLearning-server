import { ChatEntity } from "../entities";

export interface IgetAllInstructorChatsUseCase {
    execute(instructorId:string) : Promise<ChatEntity.Result[] | null>
}