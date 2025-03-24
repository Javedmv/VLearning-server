import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { ErrorResponse } from "../../_lib/error";
import { createResponse, StatusCode } from "../../_lib/constants";

export const getAllInstructorChatsController = (dependencies:IDependencies) => {
    const {useCases:{getAllInstructorChatsUseCase}} = dependencies;
    return async (req:Request, res:Response, next:NextFunction) => {
        try {
            if(!req.user){
                return next(ErrorResponse.unauthorized(""));
            }
            const chats = await getAllInstructorChatsUseCase(dependencies).execute(req.user._id)
            
            const response = createResponse(StatusCode.SUCCESS,chats)
            res.status(StatusCode.SUCCESS).json(response)
            return;
        } catch (error) {
            console.log("ERROR getAllInstructorChatsController",error)
        }
    }
}