import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"
import { ErrorResponse } from "../../_lib/common/error";
import { userCreatedProducer } from "../../infrastructure/kafka/producers";
import {NOTIFICATION_SERVICE_TOPIC} from '../../_lib/common/messages/topics'

export const forgotPasswordController = (dependencies:IDependencies) => {
    const {useCases: {findUserByEmailUseCase} } = dependencies;
    return async (req:Request, res:Response, next:NextFunction) => {
        try {
            const email = req.body.email;
            
            const userExist = await findUserByEmailUseCase(dependencies).execute(email);
            if(!userExist){
                return next(ErrorResponse.notFound("User with Email does not Exist!!!"));
            }
            try {
                await userCreatedProducer(email,NOTIFICATION_SERVICE_TOPIC!);
                res.status(200).json({
                success: true,
                message: "OTP sent successfully",
                })
                return;
            } catch (error) {
                return next(ErrorResponse.badRequest("Something went wrong in otp"))
            }
        } catch (error) {
            next(error)
        }
    }
}