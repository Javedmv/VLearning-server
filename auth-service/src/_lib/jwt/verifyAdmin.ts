import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../common/error";
import { findById } from "../../infrastructure/database/mongoDB/repositories";


export const verifyAdmin = async(req:Request, res:Response, next: NextFunction) => {
    try {
        if(!req.user){
            return next(ErrorResponse.unauthorized("Token not found,verify admin"))
        }
    
        const user = await findById(req.user._id);
        if (!user) {
            return next(ErrorResponse.unauthorized("admin not found"));
        }
    
        if (user.role !== "admin") {
            return next(ErrorResponse.unauthorized("Role mismatch,verify admin"));
        }
        
        next()
    } catch (error) {
        console.error("Error in JWT verify user:",error)
        next(error)
    }
}