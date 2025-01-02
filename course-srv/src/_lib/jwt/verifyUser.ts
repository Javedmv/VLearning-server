import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../error";


export const verifyUser = async(req:Request, res:Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return next(ErrorResponse.unauthorized("Token not found"));
        }
        const validRoles = ["student", "instructor"];
        if (!validRoles.includes(req.user.role)) {
            return next(ErrorResponse.unauthorized("Role mismatch"));
        }
        next()
    } catch (error) {
        console.error("Error in JWT verify user:",error)
        next(error)
    }
}