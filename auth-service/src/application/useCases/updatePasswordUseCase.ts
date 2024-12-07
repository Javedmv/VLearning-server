import { IDependencies } from "../interfaces/IDependencies";

export const updatePasswordUseCase = (dependencies:IDependencies) => {
    const {repositories: {updatePassword}} = dependencies;
    return {
        execute:async (email:string, passowrd:string) => {
            return await updatePassword(email, passowrd);
        } 
    }
}