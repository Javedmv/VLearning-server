import { CategoryEntity } from "../entities";

export interface IAddCategoryUseCase {
    execute(category:CategoryEntity) : Promise<CategoryEntity | null>
}