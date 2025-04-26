import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"
import { sendUserDetailsProducer } from "../../infrastructure/kafka/producers";
import { createResponse, StatusCode } from "../../_lib/common";

export const updateUserProfileController = (dependencies:IDependencies) => {
    const {useCases:{updateProfileUseCase}} = dependencies;
    return async (req:Request,res:Response,next:NextFunction) => {
        try {
            const userId = req.user?._id!;
            const data = req?.body!;
            const result = await updateProfileUseCase(dependencies).execute(userId,data)
            console.log(result,"response in controller of update Profile")
            if(result){
                await sendUserDetailsProducer([result], "chat-srv-topic")
                const {_id, email, role , username, isNewUser} = result;
                res.status(StatusCode.SUCCESS).json(
                    createResponse(
                        StatusCode.SUCCESS,
                        { _id, email, role, username, isNewUser } // Pass user data as part of the response
                    )
                );
                return;
            }
        } catch (error) {
            next(error)
        }
    }
} 