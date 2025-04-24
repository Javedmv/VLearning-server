import { CategoryEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const addCategoryUseCase = (dependencies:IDependencies)=> {
    const {repositories: {addCategory}} = dependencies;

    return {
        execute: async(category:CategoryEntity) => {
            try {
                return await addCategory(category);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error(error.message || "User creation failed");
                } else {
                    throw new Error("User creation failed due to an unknown error");
                }
            }
            
        }
    }
}