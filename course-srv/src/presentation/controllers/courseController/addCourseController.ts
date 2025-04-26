import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { ErrorResponse } from "../../../_lib/error";
import { getUserProducer, sendCourseDetailsProducer } from "../../../infrastructure/kafka/producers";
import { createResponse, StatusCode } from "../../../_lib/constants";

export const addCourseController = (dependencies:IDependencies) => {
    const {useCases:{addCourseUseCase}} = dependencies;
    return async (req:Request,res:Response, next:NextFunction) => {
        try {
            if(!req.body){
                return next(ErrorResponse.badRequest("please do add the course to complete the process"))
            }
            console.log(req.body)
            if (!req.user) {
                res.status(401).json({ success: false, message: "Authentication required: No User Provided" });
                return;
            }
            console.log(typeof req.user._id,req.user._id);
            
            await getUserProducer(req.user._id,"auth-srv-topic")
            
            const response = await addCourseUseCase(dependencies).execute(req.body, req?.user?._id)
            if(response){
                await sendCourseDetailsProducer(response,"payment-srv-topic");
                await sendCourseDetailsProducer(response,"chat-srv-topic");
            }
            res.status(StatusCode.SUCCESS).json(
                createResponse(
                    StatusCode.SUCCESS,
                    response,
                    "Course added successfully"
                )
            );
            return;
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}