import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const adminGetAllInstructorsController = (dependencies:IDependencies) => {
    const {useCases: {getAllInstructorsUseCase} } = dependencies;

    return async (req:Request, res:Response, next:NextFunction) => {
        try {
            const InstructorUsers = await getAllInstructorsUseCase(dependencies).execute()
            console.log(InstructorUsers, "in ADMIN CONTROLLER")

            res.status(200).json({
                success:true,
                data: InstructorUsers,
                message: "Successfully fetched all instructor user!!"
            })
        } catch (error) {
            console.log(error, "ERROR IN ADMIN GET ALL INSTRUCTOR CONTROLLER")
            next(error)
        }
    }
}