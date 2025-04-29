import { IAddBanner } from "../../domain/entities/BannerEntity";
import { CourseFilters } from "../../domain/entities/CourseFilter";
import { IDependencies } from "../interfaces/IDependencies";

export const getAllBannerUseCase = (dependencies: IDependencies) => {
    const { repositories: { getAllBanner } } = dependencies;
    return {
        execute: async (filter:CourseFilters): Promise<{ banner: IAddBanner.Result[]; total: number} | []> => {
            try {
                const banners = await getAllBanner(filter);
                return banners ?? []; // ✅ Ensures it always returns an array
            } catch (error) {
                console.log(error);
                return []; // ✅ Return an empty array on failure
            }
        }
    };
};
