import { IDependencies } from "../interfaces/IDependencies";

export const deleteCategoryUseCase = (dependencies:IDependencies) => {
    const {repositories: {deleteCategory}} = dependencies

    return {
        execute: async (catId:string) => {
            try {
                return await deleteCategory(catId)
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error(error.message || "Category delete failed");
                } else {
                    throw new Error("Category delete failed due to an unknown error");
                }
            }
            
        }
    }
}