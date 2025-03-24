import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { ErrorResponse } from "../../_lib/error";
import { createResponse, StatusCode } from "../../_lib/constants";

export const addNewMessageController = (dependencies:IDependencies) => {
    const {useCases: { addNewMessageUseCase } } = dependencies
    return async (req:Request,res:Response,next:NextFunction) => {
        try {
            if(!req.user){
                return next(ErrorResponse.unauthorized(""));
            }
            const message = await addNewMessageUseCase(dependencies).execute(req.body);
            
            if(!message){
                return next(ErrorResponse.internalError(""))
            }
            
            const response = createResponse(StatusCode.SUCCESS,message)
            res.status(StatusCode.SUCCESS).json(response)
            return;
        } catch (error) {
            console.log(error)
        }
    }
}