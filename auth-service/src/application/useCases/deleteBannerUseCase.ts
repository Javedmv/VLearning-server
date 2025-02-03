import { IAddBanner } from "../../domain/entities/BannerEntity";
import { IDependencies } from "../interfaces/IDependencies";

export const deleteBannerUseCase = (dependencies:IDependencies) => {
    const { repositories: {deleteBanner} } = dependencies;
    return {
        execute: async (id:string): Promise<IAddBanner.Result> => {
            try {
                return await deleteBanner(id);
            } catch (error) {
                throw new Error("Banner not found");
            }
        }
    }
}