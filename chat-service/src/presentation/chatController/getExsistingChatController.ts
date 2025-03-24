import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { ErrorResponse } from "../../_lib/error";
import { createResponse, StatusCode } from "../../_lib/constants";
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
            
            const response = createResponse(StatusCode.SUCCESS,result)
            res.status(StatusCode.SUCCESS).json(response)
            return;
        } catch (error) {
            console.log("GET CHAT ERROR CONTROLLER", error)
        }
    }
}