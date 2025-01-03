import { IDependencies } from "../interfaces/IDependencies";

export const getAllCategoryUseCase = (dependencies:IDependencies)=> {
    const {repositories: {getAllCategory}} = dependencies;

    return {
        execute: async() => {
            try {
                return await getAllCategory();
            } catch (error:any) {
                throw new Error(error?.message || "category fetch failed")
            }
        }
    }
}