import { IDependencies } from "../interfaces/IDependencies";

export const getInstructorDetailsUseCase = (dependencies:IDependencies) => {
    const {repositories: {getInstructorDetails}} = dependencies;
    return {
        execute: async(instrId:string) => {
            try {
                return await getInstructorDetails(instrId)
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error(error.message || "Category fetch failed");
                } else {
                    throw new Error("Category fetch failed due to an unknown error");
                }
            }
            
        }
    }
}