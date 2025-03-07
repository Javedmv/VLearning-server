import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { ErrorResponse } from "../../_lib/error";

export const getAllMessagesController = (dependencies:IDependencies) => {
    const { getAllMessagesUseCase } = dependencies.useCases
    return async(req:Request, res:Response, next:NextFunction) => {
        try {
            if(!req.user){
                next(ErrorResponse.unauthorized(""));
            }
            const chatId = req.params.chatId;
            const result = await getAllMessagesUseCase(dependencies).execute(chatId);
            res.status(200).json({
                success: true,
                data: result
            })
            return;
        } catch (error) {
            console.log("Error in getAllMessagesController",error)
        }
    }
}