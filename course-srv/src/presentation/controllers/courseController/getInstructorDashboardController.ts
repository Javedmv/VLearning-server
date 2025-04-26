import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { createResponse, StatusCode } from "../../../_lib/constants";

export const getInstructorDashboardController = (dependencies: IDependencies) => {
    const {useCases: {getInstructorDashboardUseCase}} = dependencies;
    return async (req: Request, res: Response, next:NextFunction) => {
        try {
            if(!req.user){
                return next(new Error("Unauthorized"));
            }
            const {_id} = req.user;

            const instructorDashboard = await getInstructorDashboardUseCase(dependencies).execute(_id);
            res.status(StatusCode.SUCCESS).json(
                createResponse(
                    StatusCode.SUCCESS,
                    instructorDashboard, 
                    "Instructor dashboard fetched successfully"
                )
            );
            return;
            
        } catch (error) {
            next(error);
        }
    }
}   