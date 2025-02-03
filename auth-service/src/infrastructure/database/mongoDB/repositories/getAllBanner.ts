import { BannerModel } from "../models/BannerSchema";

export const getAllBanner = async () => {
    try {
        const banner = await BannerModel.find();
        if(!banner){
            return Promise.resolve(null);
        }
        return banner;
    } catch (error:any) {
        throw new Error(error?.message)
    }
}