import { UserEntity } from '../entities/userEntity';

export interface IVerifyInstructorUseCase {
    execute(id:string, verify: string) : Promise<UserEntity | null>
}