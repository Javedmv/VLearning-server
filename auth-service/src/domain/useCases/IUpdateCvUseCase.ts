import { UserEntity } from "../entities";

export interface IUpdateCvUseCase {
    execute(args:string[]):Promise<UserEntity| null>; 
}