import { updateOTP } from "../database/mongoDB/repositories/updateOTP";

export const updateOTPService = async (email: string, otp: string) => {
    try {
        await updateOTP({email,otp})
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);
        } else {
            console.log("Unknown error:", error);
        }
    }
    
}