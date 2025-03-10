import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { ErrorResponse } from "../../_lib/error";

export const getAllInstructorChatsController = (dependencies:IDependencies) => {
    return async (req:Request, res:Response, next:NextFunction) => {
        try {
            if(!req.user){
                return next(ErrorResponse.unauthorized(""));
            }
            console.log(req.user?._id);
        } catch (error) {
            console.log("ERROR getAllInstructorChatsController",error)
        }
    }
}