import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const getInstructorEarningsController = (dependencies: IDependencies) => {
    const {useCases: {getEarningsUseCase}} = dependencies;
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            if(!req.user){
                res.status(401).json({ success: false, message: "Unauthorized" });
                return;
            }
            // role is either instructor or admin.
            const { role } = req.query;

            const cleanRole = role ? (role as string).replace(/"/g, '') : '';
            const earnings = await getEarningsUseCase(dependencies).execute(req.user._id, cleanRole);

            res.status(200).json({ success: true, data: earnings, message: "Earnings fetched successfully" });
            return;
        } catch (error) {
            next(error);
        }
    }
}