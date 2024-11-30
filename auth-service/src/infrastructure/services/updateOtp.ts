import { updateOTP } from "../database/mongoDB/repositories/updateOTP";

export const updateOTPService = async (email: string, otp: string) => {
    try {
        await updateOTP({email,otp})
    } catch (error:any) {
        console.log(error?.message)
    }
}