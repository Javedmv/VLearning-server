import { IDependencies } from "../interfaces/IDependencies";

export const getInstructorDetailsUseCase = (dependencies:IDependencies) => {
    const {repositories: {getInstructorDetails}} = dependencies;
    return {
        execute: async(instrId:string) => {
            try {
                return await getInstructorDetails(instrId)
            } catch (error:any) {
                throw new Error(error?.message || "category fetch failed")
            }
        }
    }
}