import { CategoryEntity } from "../entities";
import { CourseFilters } from "../entities/CourseFilter";

export interface IGetAllCategoryUseCase {
    execute(filters:CourseFilters):Promise<{categorys: CategoryEntity[];totalCategories: number;} | null>
}