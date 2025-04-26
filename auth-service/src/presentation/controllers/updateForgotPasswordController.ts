import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { hashPassword } from "../../_lib/bcrypt";
import { ErrorResponse } from "../../_lib/common/error";
import { createResponse, StatusCode } from "../../_lib/common";

export const updateForgotPasswordController = (dependencies:IDependencies) => {
    const {useCases:{ updatePasswordUseCase }} = dependencies;
    return async(req:Request,res:Response,next:NextFunction) => {
        try {
            const {password, email} = req.body;
            const hashedPassword = await hashPassword(password);
            const response = await updatePasswordUseCase(dependencies).execute(email, hashedPassword);
            if(!response){
                return next(ErrorResponse.internalError("some thing went wrong, please try again"))
            }
            res.status(StatusCode.SUCCESS).json(
                createResponse(
                    StatusCode.SUCCESS,
                    response.email, 
                    "Password Update Successfully."
                )
            );

        } catch (error) {
            next(error)
        }
    }
}