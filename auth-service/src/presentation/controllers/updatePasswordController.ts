import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { ErrorResponse } from "../../_lib/common/error";
import { compare } from "bcrypt";
import { hashPassword } from "../../_lib/bcrypt";

export const updatePasswordController = (dependencies:IDependencies) => {
    const {useCases: {updatePasswordUseCase,findUserByIdUseCase}}= dependencies;
    return async(req:Request, res:Response, next:NextFunction): Promise<void> => {
        try {
            const {currentPassword,newPassword,confirmPassword} = req.body!;
            const id = req.user?._id!;

            if (newPassword !== confirmPassword) {
                return next(ErrorResponse.badRequest("NewPassword and ConfirmPassword do not match!!"));
            }
        
            const user = await findUserByIdUseCase(dependencies).execute(id);
            if(!user){
                return next(ErrorResponse.forbidden("Sorry, User not found."));
            }
            const isPasswordCorrect = await compare(currentPassword, user?.password!);
            if (!isPasswordCorrect) {
                return next(ErrorResponse.badRequest("Current password is incorrect!"));
            }
            const hashedPassword = await hashPassword(newPassword);
            const result = await updatePasswordUseCase(dependencies).execute(req.user?.email!, hashedPassword);

            if(!result){
                res.status(400).json({success: false,message:"Please try again, Some error occured."})
                return;
            }

            res.status(200).json({
                success: true,
                message: "Password Updated Successfully."
            })
            return;
        } catch (error:any) {
            console.log(error)
            next(error)
        }
    }
}
