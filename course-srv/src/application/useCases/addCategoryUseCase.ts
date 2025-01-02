import { CategoryEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const addCategoryUseCase = (dependencies:IDependencies)=> {
    const {repositories: {addCategory}} = dependencies;

    return {
        execute: async(category:CategoryEntity) => {
            try {
                return await addCategory(category);
            } catch (error:any) {
                throw new Error(error?.message || "user creation failed")
            }
        }
    }
}