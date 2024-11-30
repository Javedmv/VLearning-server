import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const postUserFormController = (dependencies:IDependencies) => {
    return async(req:Request, res:Response, next:NextFunction) => {
        try {
            console.log(req.cookies,"yess")
            res.status(200).json({success:true, data:"hello"})
        } catch (error) {
            console.error(error)
        }
    }
}