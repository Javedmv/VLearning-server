import { UserEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const updateProfileUseCase = (dependencies:IDependencies) => {
    const {repositories: {updateProfile}} = dependencies;
    return {
        execute: async(userId:string, data:UserEntity) => {
            return await updateProfile(userId,data)
        }
    }
}