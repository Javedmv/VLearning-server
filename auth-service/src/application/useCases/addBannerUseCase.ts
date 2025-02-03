import { IAddBanner } from "../../domain/entities/BannerEntity";
import { IDependencies } from "../interfaces/IDependencies";

export const addBannerUseCase = (dependencies:IDependencies) => {
    const { repositories: {addBanner} } = dependencies;
    return {
        execute: async ({title, status, type, imageUrl, description}:IAddBanner.Params) => {
            try {
                return addBanner({title, status, type, imageUrl, description});
            } catch (error) {
                console.log(error,"error in the catch")
            }
        }
    }
}