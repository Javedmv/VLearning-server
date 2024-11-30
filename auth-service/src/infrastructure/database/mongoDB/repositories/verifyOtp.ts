import { Otp } from "../models";

export const verifyOtp = async(email: string, otp: string): Promise<boolean> => {
    try {
        const verified = await Otp.findOne({email:email, otp:otp})
        console.log(verified,"otp verified response");
        if(!verified)return false;
        return true;
    } catch (error) {
        console.error(error, "something went wrong")
        return false;
    }
}