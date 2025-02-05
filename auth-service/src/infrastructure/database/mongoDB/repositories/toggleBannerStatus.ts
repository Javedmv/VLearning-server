import { BannerModel } from "../models/BannerSchema"

export const toggleBannerStatus = async (id:string,status:boolean) => {
    try {
        const result = await BannerModel.findByIdAndUpdate(id,{$set:{status: !status }})
        if(!result){
            return false
        }
        return true
    } catch (error:any) {
        throw new Error(error?.message)
    }
}