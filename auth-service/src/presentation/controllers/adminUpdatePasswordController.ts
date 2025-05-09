import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { compare } from '@node-rs/bcrypt';;
import { ErrorResponse } from "../../_lib/common/error";
import { hashPassword } from '../../_lib/bcrypt/hashPassword';
import { createResponse, StatusCode } from "../../_lib/common";

export const adminUpdatePasswordController = (dependencies:IDependencies) => {
    const {useCases: {findUserByIdUseCase, updatePasswordUseCase}} = dependencies;
    return async (req:Request, res:Response, next:NextFunction): Promise<void> => {
        try {
            const id = req.user?._id!;
            const {currentPassword, newPassword, confirmPassword} = req?.body;

            if (newPassword !== confirmPassword) {
                return next(ErrorResponse.badRequest("NewPassword and ConfirmPassword do not match!!"));
            }
        
            const admin = await findUserByIdUseCase(dependencies).execute(id);
            if (!admin || admin?.role !== "admin") {
                return next(ErrorResponse.forbidden("Sorry, you are not an admin user"));
            }

            const isPasswordCorrect = await compare(currentPassword, admin?.password!);
            if (!isPasswordCorrect) {
                return next(ErrorResponse.badRequest("Current password is incorrect!"));
            }
            const hashedPassword = await hashPassword(newPassword);
            const result = await updatePasswordUseCase(dependencies).execute(req.user?.email!, hashedPassword);
            if(!result){
                res.status(400).json({success: false,message:"Please try again, Some error occured."})
                return;
            }
            
            res.status(StatusCode.SUCCESS).json(
                createResponse(
                    StatusCode.SUCCESS,
                    undefined,
                    "Password updated successfully."
                )
            );
        } catch (error) {
            console.log(error, "ERROR IN ADMIN UPDATE PASSWORD CONTROLLER")
            next(error)
        }
    }
}