import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { ErrorResponse } from "../../_lib/error";

export const getExsistingChatController = (dependencies:IDependencies) => {
    const {useCases: {getChatGroupUseCase}} = dependencies
    return async(req:Request,res:Response,next:NextFunction) => {
        try {
            const courseId = req.query.courseId as string;
            if(!req.user){
                return next(ErrorResponse.unauthorized(""));
            }
            const userId = req.user?._id
            const result = await getChatGroupUseCase(dependencies).execute(courseId,userId);
            res.status(200).json({
                success: true,
                data: result,
            })
            return
        } catch (error) {
            console.log("GET CHAT ERROR CONTROLLER", error)
        }
    }
}