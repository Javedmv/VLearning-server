import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";

export const getInstructorDashboardController = (dependencies: IDependencies) => {
    const {useCases: {getInstructorDashboardUseCase}} = dependencies;
    return async (req: Request, res: Response, next:NextFunction) => {
        try {
            if(!req.user){
                return next(new Error("Unauthorized"));
            }
            const {_id} = req.user;
            console.log(_id,"_id");
            const instructorDashboard = await getInstructorDashboardUseCase(dependencies).execute(_id);
            res.status(200).json({
                success: true,
                message: "Instructor dashboard fetched successfully",
                data: instructorDashboard
            });
            return;
            
        } catch (error) {
            next(error);
        }
    }
}   