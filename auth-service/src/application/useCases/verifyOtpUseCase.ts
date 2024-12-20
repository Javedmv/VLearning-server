import { IDependencies } from "../interfaces/IDependencies";

export const verifyOtpUseCase = (dependencies: IDependencies) => {
    const { repositories: { verifyOtp} } = dependencies;
    return {
        execute: async(email: string, otp: string) => {
            try {
                console.log(email,otp," in the verifyOtpUseCase")
                return await verifyOtp(email,otp);
            } catch (error) {
                console.log("<< Something went wrong in verifyOtp useCase >>");
                return false;
            }
        }
    }
}