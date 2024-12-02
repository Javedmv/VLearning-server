import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../common/error";
import { findById } from "../../infrastructure/database/mongoDB/repositories";


export const verifyUser = async(req:Request, res:Response, next: NextFunction) => {
    try {
        if(!req.user){
            return next(ErrorResponse.unauthorized("Token not found,verify student"))
        }
    
        const user = await findById(req.user._id);
        if (!user) {
            return next(ErrorResponse.unauthorized("user(student or instructor) not found"));
        }
    
        if (user.role !== "student" && user.role !== "instructor") {
            return next(ErrorResponse.unauthorized("Role mismatch,verify student"));
        }
        
        next()
    } catch (error) {
        console.error("Error in JWT verify user:",error)
        next(error)
    }
}