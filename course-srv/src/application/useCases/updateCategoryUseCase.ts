import { UpdateCategoryEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const updateCategoryUseCase = (dependencies:IDependencies) => {
    const {repositories: {updateCategory}} = dependencies;
    return {
        execute: async(catId:string, category:UpdateCategoryEntity) => {
            try {
                return await updateCategory(catId,category);
            } catch (error:any) {
                throw new Error(error?.message || "category fetch failed")

            }
        }
    }
}