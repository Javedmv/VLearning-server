import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const adminGetAllStudentsController = (dependencies:IDependencies) => {
    const { useCases: {getAllStudentsUseCase} } = dependencies;

    return async(req:Request, res:Response, next:NextFunction) => {
        try {
            const studentUsers = await getAllStudentsUseCase(dependencies).execute();
            res.status(200).json({
                success:true,
                data: studentUsers,
                message: "Successfully fetched all student user!!"
            })

        } catch (error) {
            console.log(error, "error in ADMIN GET STUDENT CONTROLLER")
            next(error)
        }
    }
}