import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { ErrorResponse } from "../../_lib/common/error";
import jwt ,{VerifyErrors , JwtPayload} from 'jsonwebtoken';

export const getUserController = (dependencies:IDependencies) => {
    const {useCases: { findUserByIdUseCase} } = dependencies;
    return async (req:Request,res: Response, next: NextFunction) => {
        
        try {
            if(!req.user){
                // throw new Error("Authentication required: No User Provided")
                return
            }

            const result = await findUserByIdUseCase(dependencies).execute(req.user._id)
            if(!result){
                return(next(ErrorResponse.notFound("User not found!")));
            }
            const  {_id,email,role,username, isNewUser,isBlocked, isVerified, profession, profileDescription} = result;
            res.status(200).json({
                success: true,
                data:  {_id,email,role,username,isNewUser,isBlocked, isVerified , profession, profileDescription},
                message: "User Exist!!"
            })
            return;
        } catch (error) {
            next(error)
        }
    }
}