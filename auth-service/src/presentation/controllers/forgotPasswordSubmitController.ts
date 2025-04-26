import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { createResponse, StatusCode } from "../../_lib/common";

export const forgotPasswordSubmitController = (dependencies:IDependencies) => {
    const {useCases: {verifyOtpUseCase}} = dependencies;

    return async(req:Request, res:Response, next: NextFunction) => {
        try {
            const {otp, email} = req.body;
            
            const isOtpVerified = await verifyOtpUseCase(dependencies).execute(email,otp);

            if(isOtpVerified){
                res.status(StatusCode.SUCCESS).json({
                    ...createResponse(
                        StatusCode.SUCCESS,
                        undefined,
                        "OTP Verified Successfully."
                    ),
                    user: email,
                });
                return;
            }

            res.status(StatusCode.UNAUTHORIZED).json({
                ...createResponse(
                    StatusCode.UNAUTHORIZED,
                    undefined,
                    "OTP is invalid, try another"
                ),
                user: email,
            });
            return;
        } catch (error) {
            next(error)
        }
    }
}