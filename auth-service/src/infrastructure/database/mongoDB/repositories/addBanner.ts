import { IAddBanner } from "../../../../domain/entities/BannerEntity";
import { BannerModel } from "../models/BannerSchema";

export const addBanner = async ({ title, status, type, imageUrl, description, priority }: IAddBanner.Params): Promise<IAddBanner.Result | null> => {
    try {
        const bannerData: Partial<IAddBanner.Params> = { title, status, type, imageUrl, priority };

        if (description) {
            bannerData.description = description;
        }

        const newBanner = await BannerModel.create(bannerData);

        if (!newBanner) {
            throw new Error("Banner creation failed");
        }

        return newBanner as IAddBanner.Result;
    } catch (error) {
        console.error("Error adding banner:", error);
        return null; // Returning null to indicate failure
    }
};
