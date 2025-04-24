import { BannerModel } from "../models/BannerSchema"

export const toggleBannerStatus = async (id:string,status:boolean) => {
    try {
        const result = await BannerModel.findByIdAndUpdate(id,{$set:{status: !status }})
        if(!result){
            return false
        }
        return true
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
    
}