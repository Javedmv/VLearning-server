import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { createResponse, StatusCode } from "../../_lib/constants/constants";

export const getInstructorEarningsController = (dependencies: IDependencies) => {
    const {useCases: {getEarningsUseCase}} = dependencies;
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            if(!req.user){
                res.status(StatusCode.UNAUTHORIZED).json(
                    createResponse(
                        StatusCode.UNAUTHORIZED,
                        undefined,
                        "Unauthorized"
                    )
                );
                return;
            }
            // role is either instructor or admin.
            const { role } = req.query;

            const cleanRole = role ? (role as string).replace(/"/g, '') : '';
            const earnings = await getEarningsUseCase(dependencies).execute(req.user._id, cleanRole);

            res.status(StatusCode.SUCCESS).json(
                createResponse(
                    StatusCode.SUCCESS,
                    earnings,
                    "Earnings fetched successfully"
                )
            );
            return;
        } catch (error) {
            next(error);
        }
    }
}