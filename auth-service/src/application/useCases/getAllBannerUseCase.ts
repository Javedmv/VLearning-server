import { IAddBanner } from "../../domain/entities/BannerEntity";
import { IDependencies } from "../interfaces/IDependencies";

export const getAllBannerUseCase = (dependencies: IDependencies) => {
    const { repositories: { getAllBanner } } = dependencies;
    return {
        execute: async (): Promise<IAddBanner.Result[]> => {
            try {
                const banners = await getAllBanner();
                return banners ?? []; // ✅ Ensures it always returns an array
            } catch (error) {
                console.log(error);
                return []; // ✅ Return an empty array on failure
            }
        }
    };
};
