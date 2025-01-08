import { CategoryEntity } from '../entities/categoryEntity';

export interface IGetActiveCategoryUseCase {
    execute() : Promise<CategoryEntity[] | null>
}