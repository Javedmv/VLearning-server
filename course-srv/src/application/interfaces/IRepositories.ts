import { CategoryEntity, UpdateCategoryEntity } from "../../domain/entities";

export interface IRepositories {
    addCategory:(category:CategoryEntity) => Promise<CategoryEntity | null>
    getAllCategory: () => Promise<CategoryEntity[] | null>
    updateCategory: (catId:string, category:UpdateCategoryEntity) => Promise<CategoryEntity | null>;
}