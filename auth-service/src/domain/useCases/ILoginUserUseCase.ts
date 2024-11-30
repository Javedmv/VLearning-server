import { UserEntity } from "../entities";

export interface ILoginUserUseCase{
    execute(email:string): Promise<UserEntity | null >;
};