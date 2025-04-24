import { IDependencies } from "../interfaces/IDependencies";

export const getAllCategoryUseCase = (dependencies:IDependencies)=> {
    const {repositories: {getAllCategory}} = dependencies;

    return {
        execute: async() => {
            try {
                return await getAllCategory();
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