import { IDependencies } from "../interfaces/IDependencies";

export const getAllStudentsUseCase = (dependencies:IDependencies) => {
    const {repositories: {getStudentUser}} = dependencies;
    return {
        execute: async () => {
            return await getStudentUser()
        }
    }
}