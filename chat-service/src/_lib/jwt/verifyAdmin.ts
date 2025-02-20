import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../error";


export const verifyAdmin = async(req:Request, res:Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return next(ErrorResponse.unauthorized("Token not found, verify admin"));
          }
      
          if (req.user.role !== "admin") {
            return next(ErrorResponse.unauthorized("Role mismatch, verify admin"));
          }
      
          next();
    } catch (error) {
        console.error("Error in JWT verify user:",error)
        next(error)
    }
}