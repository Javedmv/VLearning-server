import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const findByEmailContorller = (dependencies:IDependencies) => {
    const { useCases: { findUserByEmailUseCase} } = dependencies;
    
    return async (req:Request, res:Response, next:NextFunction) => {
        try {
            const {email} = req.params;
            const result = await findUserByEmailUseCase(dependencies).execute(email);
            if(!result){
                throw new Error("User not found")
            }
            res.status(200).json({
                success: true,
                data: result,
                message: "User exist!"
            })
        } catch (error) {
            next(error);
        }
    }

}