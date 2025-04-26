import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { createResponse, StatusCode } from "../../_lib/common";

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

            res.status(StatusCode.SUCCESS).json(
                createResponse(
                    StatusCode.SUCCESS,
                    undefined,
                    "Logout Successful"
                )
            );
        } catch (error) {
            next(error)
        }
    }
}