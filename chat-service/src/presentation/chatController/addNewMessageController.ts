import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { ErrorResponse } from "../../_lib/error";

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
            res.status(200).json({
                success:true,
                data:message
            })
            return;
        } catch (error) {
            console.log(error)
        }
    }
}