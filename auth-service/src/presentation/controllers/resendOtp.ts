import { NextFunction, Response, Request } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { ErrorResponse } from "../../_lib/common/error";
import { userCreatedProducer } from "../../infrastructure/kafka/producers";
import {NOTIFICATION_SERVICE_TOPIC} from '../../_lib/common/messages/topics'


export const resendOtpController = (dependencies:IDependencies) => {
    const {useCases: {findUserByEmailUseCase}} = dependencies;

    return async (req:Request, res: Response, next: NextFunction):Promise<void> => {
        try {
            const userCredentials = req.body

            const userExist: any = await findUserByEmailUseCase(dependencies).execute(userCredentials.email)

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
            
        } catch (error) {
            console.error(error, "Something went wrong in resendOtp controller");
            next(error);
        }
    }
}