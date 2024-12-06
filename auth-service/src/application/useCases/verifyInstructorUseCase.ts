import { IDependencies } from "../interfaces/IDependencies";

export const verifyInstructorUseCase = (dependencies:IDependencies) => {
    const {repositories: {updateIsVerified}} = dependencies;
    return {
        execute: async(id:string, verify:string) => {
            return await updateIsVerified(id,verify)
        }
    }
}