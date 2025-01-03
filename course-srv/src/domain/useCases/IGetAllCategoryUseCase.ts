import { CategoryEntity } from "../entities";

export interface IGetAllCategoryUseCase {
    execute(): Promise<CategoryEntity[] | null>
}