import { CategoryEntity } from "../entities";

export interface IDeleteCategoryUseCase {
    execute(catId:string) : Promise<CategoryEntity | null>
}