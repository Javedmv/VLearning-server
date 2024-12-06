import { IDependencies } from "../interfaces/IDependencies";

export const getAllInstructorsUseCase = (dependencies:IDependencies) => {
    const {repositories: {getInstructorUser} } = dependencies;
    return {
        execute: async () => {
            return await getInstructorUser()
        }
    }
}