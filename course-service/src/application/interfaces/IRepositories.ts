import { CategoryEntity } from "../../domain/entities";

export interface IRepositories  {
    addCategory:(category:CategoryEntity) => Promise<CategoryEntity | null>;
}