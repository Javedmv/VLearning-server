import { CategoryEntity } from "../../domain/entities";
import { CourseFilters } from "../../domain/entities/CourseFilter";
import { IDependencies } from "../interfaces/IDependencies";

export const getAllCategoryUseCase = (dependencies:IDependencies)=> {
    const {repositories: {getAllCategory}} = dependencies;

    return {
        execute: async(filters:CourseFilters): Promise<{categorys: CategoryEntity[];totalCategories: number;} | null> => {
            try {
                return await getAllCategory(filters);
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