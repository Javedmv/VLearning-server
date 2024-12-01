import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const postUserFormController = (dependencies:IDependencies) => {
    return async(req:Request, res:Response, next:NextFunction) => {
        try {
            console.log(req.body,"form data");
            console.log(req.files,"files");

            if (!Object.keys(req.body).length) {
                res.status(400).json({
                    success: false,
                    message: 'No form data received'
                });
                return;
            }
            res.status(200).json({success: true, data: req.body});
        } catch (error) {
            next(error);
        }
    }
}