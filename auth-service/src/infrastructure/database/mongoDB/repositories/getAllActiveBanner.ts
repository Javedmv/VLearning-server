import { BannerModel } from "../models/BannerSchema";

export const getAllActiveBanner = async () => {
    try {
        const banner = await BannerModel.find({status:true});
        return banner;
    } catch (error:any) {
        throw new Error(error?.message)
    }
}