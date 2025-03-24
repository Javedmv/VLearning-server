import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { ErrorResponse } from "../../_lib/error";
import { createResponse, StatusCode } from "../../_lib/constants";

export const getAllMessagesController = (dependencies:IDependencies) => {
    const { getAllMessagesUseCase } = dependencies.useCases
    return async(req:Request, res:Response, next:NextFunction) => {
        try {
            if(!req.user){
                next(ErrorResponse.unauthorized(""));
            }
            const chatId = req.params.chatId;
            const result = await getAllMessagesUseCase(dependencies).execute(chatId);
            
            const response = createResponse(StatusCode.SUCCESS,result)
            res.status(StatusCode.SUCCESS).json(response)
            return;
        } catch (error) {
            console.log("Error in getAllMessagesController",error)
        }
    }
}