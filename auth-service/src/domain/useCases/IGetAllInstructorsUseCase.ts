import { UserEntity } from "../entities";

export interface IGetAllInstructorsUseCase {
    execute(): Promise<UserEntity[] | null>
}