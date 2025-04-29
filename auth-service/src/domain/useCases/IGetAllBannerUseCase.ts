import { IAddBanner } from "../entities/BannerEntity";
import { CourseFilters } from "../entities/CourseFilter";

export interface IGetAllBannerUseCase {
    execute(filter:CourseFilters): Promise<{ banner: IAddBanner.Result[]; total: number} | []>;
}