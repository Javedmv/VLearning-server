import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"
import { ErrorResponse } from "../../_lib/common/error";
import { userCreatedProducer } from "../../infrastructure/kafka/producers";
import {NOTIFICATION_SERVICE_TOPIC} from '../../_lib/common/messages/topics'
import { createResponse, StatusCode } from "../../_lib/common";

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
                res.status(StatusCode.SUCCESS).json(
                    createResponse(
                        StatusCode.SUCCESS,
                        undefined,
                        "OTP sent successfully"
                    )
                );
                return;
            } catch (error) {
                return next(ErrorResponse.badRequest("Something went wrong in otp"))
            }
        } catch (error) {
            next(error)
        }
    }
}