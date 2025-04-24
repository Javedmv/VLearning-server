import { BannerModel } from "../models/BannerSchema";

export const getAllBanner = async () => {
    try {
        const banner = await BannerModel.find();
        if(!banner){
            return Promise.resolve(null);
        }
        return banner;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
    
}