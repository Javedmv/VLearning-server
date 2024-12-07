import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const forgotPasswordSubmitController = (dependencies:IDependencies) => {
    const {useCases: {verifyOtpUseCase}} = dependencies;

    return async(req:Request, res:Response, next: NextFunction) => {
        try {
            const {otp, email} = req.body;
            
            const isOtpVerified = await verifyOtpUseCase(dependencies).execute(email,otp);

            if(isOtpVerified){
                    res.status(200).json({
                    user: email,
                    success: true,
                    message: "OTP Verifed Successfully."
                })
                return;
            }

            res.status(401).json({
            user: email,
            success: false,
            message: "OTP is Invalid try another",
            })
            return;
        } catch (error) {
            next(error)
        }
    }
}