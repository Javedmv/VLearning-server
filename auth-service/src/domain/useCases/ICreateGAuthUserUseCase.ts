import { UserEntity } from '../entities/userEntity';
export interface ICreateGAuthUserUseCase {
    execute(data: { email: string; name: string }) : Promise<UserEntity | null>
}