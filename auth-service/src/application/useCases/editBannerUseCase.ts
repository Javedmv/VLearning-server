import { TOBE } from "../../_lib/utils/Tobe";
import { IAddBanner } from "../../domain/entities/BannerEntity";
import { IDependencies } from "../interfaces/IDependencies"

export const editBannerUseCase = (dependencies:IDependencies) => {
    const {repositories:{ editBanner }} = dependencies 

    return {
        execute: async (data: TOBE) => {
            try {
                return await editBanner(data);
            } catch (error) {
                throw new Error("Edit Banner failed.");
            }
        }
    }
}