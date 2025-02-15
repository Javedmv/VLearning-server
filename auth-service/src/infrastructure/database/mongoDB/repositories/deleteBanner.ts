import { BannerModel } from "../models/BannerSchema";
import { IAddBanner } from '../../../../domain/entities/BannerEntity';

export const deleteBanner = async (id:string):Promise<IAddBanner.Result> => {
    try {
        const banner = await BannerModel.findByIdAndDelete(id);
        if (!banner) {
            throw new Error("Banner not found");
        }
        return banner;
    } catch (error) {
        console.log(error);
        throw new Error("Banner not found");
    }
}