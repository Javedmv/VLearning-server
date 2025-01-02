import { CategoryEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const addCategoryUseCase = async (dependencies:IDependencies)=> {
    const {repositories: {addCategory}} = dependencies;
    return {
        execute: async(category:CategoryEntity) => {
            return await addCategory(category);
        }
    }
}