import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { ErrorResponse } from "../../_lib/error";

export const getAllInstructorChatsController = (dependencies:IDependencies) => {
    const {useCases:{getAllInstructorChatsUseCase}} = dependencies;
    return async (req:Request, res:Response, next:NextFunction) => {
        try {
            if(!req.user){
                return next(ErrorResponse.unauthorized(""));
            }
            const chats = await getAllInstructorChatsUseCase(dependencies).execute(req.user._id)
            res.status(200).json({
                success: true,
                data: chats
            })
            console.log(chats)
            return;
        } catch (error) {
            console.log("ERROR getAllInstructorChatsController",error)
        }
    }
}