import { UserEntity } from '../entities/userEntity';
export interface IUpdateProfileUseCase {
    execute(userId:string, data:UserEntity): Promise<UserEntity | null>;
}