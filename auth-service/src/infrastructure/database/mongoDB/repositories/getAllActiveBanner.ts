import { BannerModel } from "../models/BannerSchema";

export const getAllActiveBanner = async () => {
    try {
        const banner = await BannerModel.find({status:true});
        return banner;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
    
}