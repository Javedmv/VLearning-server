import { UserEntity } from "../entities";

export interface IBlockUserUseCase {
    execute(id:string, block: string) : Promise<UserEntity | null>
}