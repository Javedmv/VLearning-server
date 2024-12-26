import { IDependencies } from "../interfaces/IDependencies";

export const updateCvUseCase = (dependencies:IDependencies) => {
    const {repositories: {updateReapply}} = dependencies;
    return {
        execute: async (args:string[]) => {
            return await updateReapply(args)
        }
    }
}