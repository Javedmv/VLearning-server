import { IDependencies } from "../interfaces/IDependencies";

export const updateCategoryStatusUseCase = (dependencies:IDependencies) => {
    const {repositories: {updateCategoryStatus}} = dependencies
    return {
        execute: async (catId:string,status:Boolean) => {
            try {
                return await updateCategoryStatus(catId,status)
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error(error.message || "Category status update failed");
                } else {
                    throw new Error("Category status update failed due to an unknown error");
                }
            }
            
        }
    }
}