import { IDependencies } from "../interfaces/IDependencies";

export const getActiveCategoryUseCase = (dependencies:IDependencies) => {
    const {repositories:{getActiveCategory}} = dependencies;

    return {
        execute: async () => {
            try {
                return await getActiveCategory()
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