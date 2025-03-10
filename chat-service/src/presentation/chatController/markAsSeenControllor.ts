import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const markAsSeenController = (dependencies:IDependencies) => {
    return async(req:Request, res:Response, next:NextFunction) => {
        try {
            console.log(req.body,"mark as seen");
            // TODO: NEED TO COMPLETE IT.
        } catch (error) {
            console.error("ERROR in markAsSeenCotroller",error);
        }
    }
}