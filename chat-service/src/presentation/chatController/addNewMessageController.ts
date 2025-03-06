import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const addNewMessageController = (dependencies:IDependencies) => {
    return async (req:Request,res:Response,next:NextFunction) => {
        try {
            console.log(req.body);
        } catch (error) {
            console.log(error)
        }
    }
}