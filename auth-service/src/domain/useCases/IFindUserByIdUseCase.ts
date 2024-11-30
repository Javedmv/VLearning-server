import { UserEntity } from '../entities/userEntity';

export interface IFindUserByIdUseCase {
    execute(id:string): Promise<UserEntity | null>
}