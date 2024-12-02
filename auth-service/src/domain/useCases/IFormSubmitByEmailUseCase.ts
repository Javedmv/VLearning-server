import { UserEntity } from "../entities";

export interface IFormSubmitByEmailUseCase {
    execute(data: UserEntity): Promise<UserEntity | null>;
}