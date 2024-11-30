import { IOtp } from "../../../../domain/entities";
import { Otp } from "../models";

export const updateOTP = async (data: {email:string,otp:string} ): Promise<IOtp | null> => {
    try {
        const result = await Otp.updateOne(
            {email: data.email},
            {$set:{ otp: data.otp }},
            {upsert:true , new : true}
        )
        if(!result){
            throw new Error("otp update/creation failed!")
        }

        const updateUser = await Otp.findOne({email: data.email});
        console.log(updateUser)
        return updateUser;

    } catch (error:any) {
        throw new Error(error?.message)
    }
}