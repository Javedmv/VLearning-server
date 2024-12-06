import { IDependencies } from "../../application/interfaces/IDependencies";
import { Request, Response, NextFunction } from 'express';

export const adminVerifyInstructorController = (dependencies:IDependencies) => {
    const {useCases :{verifyInstructorUseCase}} = dependencies;

    return async(req:Request, res:Response, next:NextFunction) => {
        try {
            const isVerified = req.body?.isVerified;
            const userId = req.params?.id;
            
            const instructorUser = await verifyInstructorUseCase(dependencies).execute(userId, isVerified);

            res.status(200).json({
                success:true,
                data: instructorUser,
                message: `User Has Been ${instructorUser?.isVerified} as an Instructor.`
            })
        } catch (error) {
            console.log(error, "error in ADMIN VERIFY INSTRUCTOR CONTROLLER")
            next(error)
        }
    }
}