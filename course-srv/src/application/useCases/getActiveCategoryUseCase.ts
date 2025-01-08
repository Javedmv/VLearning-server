import { IDependencies } from "../interfaces/IDependencies";

export const getActiveCategoryUseCase = (dependencies:IDependencies) => {
    const {repositories:{getActiveCategory}} = dependencies;

    return {
        execute: async () => {
            try {
                return await getActiveCategory()
            } catch (error:any) {
                throw new Error(error?.message || "category fetch failed")
            }
        }
    }
}