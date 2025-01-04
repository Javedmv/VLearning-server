import { CategoryEntity, UpdateCategoryEntity } from "../entities";

export interface IUpdateCategoryUseCase {
    execute(catId:string, category:UpdateCategoryEntity) : Promise<CategoryEntity[]>;
}