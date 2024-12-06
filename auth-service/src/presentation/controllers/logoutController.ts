import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const logoutController = (dependencies:IDependencies) => {
    return async (req:Request, res:Response, next:NextFunction) => {
        try {
            res.cookie("access_token", "", {
                maxAge: 1,
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });

            res.cookie("refresh_token", "", {
                maxAge: 1,
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });

            res.status(204).json({success:true, message:"Logout Successfully."});
        } catch (error) {
            next(error)
        }
    }
}