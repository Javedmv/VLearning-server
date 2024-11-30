import { NextFunction, Request, Response } from "express";
import { loginValidation } from "../../_lib/validation";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { ErrorResponse } from "../../_lib/common/error";
import { comparePassword } from "../../_lib/bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../_lib/jwt";

export const loginController = (dependencies: IDependencies) => {
    const { useCases: {loginUserUseCase}} = dependencies;

    return async (req:Request,res: Response, next: NextFunction) => {
        try {
            const {value, error} = loginValidation.validate(req.body);

            if(error){
                throw new Error(error.message)
            }
            const result = await loginUserUseCase(dependencies).execute(value.email);
            if(result){
                const {password,_id, email, role, username, isNewUser, ...restResult} = result;
                if(result.isBlocked){
                    return next(ErrorResponse.unauthorized("Sorry, Your Account Is Blocked!"));
                }
                const match = await comparePassword(value.password,password);
                if(!match){
                    return next(ErrorResponse.unauthorized("Incorrect password. Please try again."))
                }
                const accessToken = generateAccessToken({
                    _id: String(_id),
                    email: email,
                    role: role
                })
    
                const refreshToken = generateRefreshToken({
                    _id: String(_id),
                    email: email,
                    role: role
                })
    
                res.cookie("access_token",accessToken,{
                    httpOnly:true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                    maxAge: 24 * 60 * 60 * 1000 
                })
                res.cookie("refresh_token",refreshToken,{
                    httpOnly:true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                })
                
                res.status(200).json({
                    success: true,
                    data: {_id, email, role, username, isNewUser},
                    message:"Login Successfull!"
                })
            }else{
                return next(ErrorResponse.unauthorized("Account with email does not exits"))
            }
            
        } catch (error:any) {
            console.log(error)
            next(error)
        }
    }
}