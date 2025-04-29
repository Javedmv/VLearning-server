import { number } from "joi";
import { IAddBanner } from "../../../../domain/entities/BannerEntity";
import { CourseFilters } from "../../../../domain/entities/CourseFilter";
import { BannerModel } from "../models/BannerSchema";

export const getAllBanner = async (filter:CourseFilters) :Promise<{ banner: IAddBanner.Result[]; total: number} | []> => {
    try {
        const { page, limit } = filter;
        const skip = (page - 1) * limit;
        const total = await BannerModel.countDocuments();

        const banner = await BannerModel.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
        if(!banner){
            return Promise.resolve([]);
        }
        return {banner:banner as IAddBanner.Result[],total:total as number};
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
    
}