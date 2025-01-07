import { IDependencies } from "../interfaces/IDependencies";

export const updateCategoryStatusUseCase = (dependencies:IDependencies) => {
    const {repositories: {updateCategoryStatus}} = dependencies
    return {
        execute: async (catId:string,status:Boolean) => {
            try {
                return await updateCategoryStatus(catId,status)
            } catch (error:any) {
                throw new Error(error?.message || "category status update failed")
            }
        }
    }
}