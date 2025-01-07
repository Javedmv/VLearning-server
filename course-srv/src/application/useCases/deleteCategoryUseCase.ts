import { IDependencies } from "../interfaces/IDependencies";

export const deleteCategoryUseCase = (dependencies:IDependencies) => {
    const {repositories: {deleteCategory}} = dependencies

    return {
        execute: async (catId:string) => {
            try {
                return await deleteCategory(catId)
            } catch (error:any) {
                throw new Error(error?.message || "category delete failed")
            }
        }
    }
}