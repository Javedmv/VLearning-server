import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const googleSignupController = (dependencies:IDependencies) => {
    return async(req:Request, res:Response, next:NextFunction): Promise<void> => {
        try {
           console.log("reached backend google signup")
           const {decoded} = req.body;
           console.log(decoded)
        } catch (error:any) {
            console.error(error, "ERROR IN GET USER DETAILS CONTROLLER")
            next(error)
        }
    }
}