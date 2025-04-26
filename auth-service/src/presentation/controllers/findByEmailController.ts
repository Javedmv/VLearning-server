import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { createResponse, StatusCode } from "../../_lib/common";

export const findByEmailContorller = (dependencies:IDependencies) => {
    const { useCases: { findUserByEmailUseCase} } = dependencies;
    
    return async (req:Request, res:Response, next:NextFunction) => {
        try {
            const {email} = req.params;
            const result = await findUserByEmailUseCase(dependencies).execute(email);
            if(!result){
                throw new Error("User not found")
            }
            res.status(StatusCode.SUCCESS).json(
                createResponse(
                    StatusCode.SUCCESS,
                    result,
                    "User exists!"
                )
            );
        } catch (error) {
            next(error);
        }
    }

}