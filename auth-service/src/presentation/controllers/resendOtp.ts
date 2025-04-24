import { NextFunction, Response, Request } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { ErrorResponse } from "../../_lib/common/error";
import { userCreatedProducer } from "../../infrastructure/kafka/producers";
import {NOTIFICATION_SERVICE_TOPIC} from '../../_lib/common/messages/topics'
import { TOBE } from "../../_lib/utils/Tobe";


export const resendOtpController = (dependencies:IDependencies) => {
    const {useCases: {findUserByEmailUseCase}} = dependencies;

    return async (req:Request, res: Response, next: NextFunction):Promise<void> => {
        try {
            const userCredentials = req.body

            const userExist: TOBE = await findUserByEmailUseCase(dependencies).execute(userCredentials.email)

            if(userExist){
                return next(
                    ErrorResponse.conflict(
                        "Email is already registed try another email"
                    )
                )
            }

            await userCreatedProducer(userCredentials.email,NOTIFICATION_SERVICE_TOPIC);
            res.status(200).json({
                success: true,
                message: "otp sent successfully",
              });
            return;
            
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error, "Something went wrong in resendOtp controller:", error.message);
            } else {
                console.error("Something went wrong in resendOtp controller:", error);
            }
            next(error);
        }
        
    }
}