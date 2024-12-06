import { IDependencies } from "../interfaces/IDependencies";

export const blockUserUseCase = (dependencies:IDependencies) => {
    const {repositories: {blockUser}} = dependencies;

    return {
        execute: async(id:string, block:string) => {
            return await blockUser(id,block)
        }
    }
}