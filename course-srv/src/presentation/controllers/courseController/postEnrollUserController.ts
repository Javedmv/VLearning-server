import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { ErrorResponse } from "../../../_lib/error";
import enrollUserProducer from "../../../infrastructure/kafka/producers/enrollUserProducer";
import { createResponse, StatusCode } from "../../../_lib/constants";

export const postEnrollUserController = (dependencies:IDependencies) => {
    const {useCases:{enrollUserUseCase}} = dependencies;
    return async (req:Request,res:Response,next:NextFunction) => {
        try {
            if(!req.body){
                return next(ErrorResponse.badRequest("Sorry, something went wrong please try again."))
            }
            if (!req.user) {
                res.status(StatusCode.UNAUTHORIZED).json(
                    createResponse(
                        StatusCode.UNAUTHORIZED,
                        undefined,
                        "Authentication required: No User Provided"
                    )
                );
                return;
            }
            const {courseId,userId} = req?.body;

            const result = await enrollUserUseCase(dependencies).execute(courseId,userId);

            await enrollUserProducer(courseId,userId,"payment-srv-topic");
            await enrollUserProducer(courseId,userId,"chat-srv-topic");

            if(!result){
                res.status(StatusCode.NOT_FOUND).json(
                    createResponse(
                        StatusCode.NOT_FOUND,
                        undefined,
                        "Something went wrong, please try again."
                    )
                );
                return;
            }

            res.status(StatusCode.SUCCESS).json(
                createResponse(
                    StatusCode.SUCCESS,
                    result._id,
                    "Student enroll completed successfully."
                )
            );
            return;

        } catch (error) {
            console.error("Error in getCourseDetailsController:", error);
            next(error);
        }
    }
}