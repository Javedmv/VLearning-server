import { UpdateCategoryEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const updateCategoryUseCase = (dependencies:IDependencies) => {
    const {repositories: {updateCategory}} = dependencies;
    return {
        execute: async(catId:string, category:UpdateCategoryEntity) => {
            try {
                return await updateCategory(catId,category);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error(error.message || "Category update failed");
                } else {
                    throw new Error("Category update failed due to an unknown error");
                }
            }
            
        }
    }
}