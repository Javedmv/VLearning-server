import { UserEntity } from "../entities";

export interface IGetAllStudentsUseCase{
    execute():Promise<UserEntity[] | null>;
}