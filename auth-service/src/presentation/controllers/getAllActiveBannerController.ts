import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const getAllActiveBannerController = (dependencies:IDependencies) => {
    const {useCases:{getAllActiveBannerUseCase}} = dependencies
    return async (req:Request,res:Response,next:NextFunction) => {
        try {
            const { highPriority = [], mediumPriority = [], lowPriority = [] } = await getAllActiveBannerUseCase(dependencies).execute();
            res.status(200).json({
                success:true,
                highPriority,
                mediumPriority,
                lowPriority
            })
            return;
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error from getAllActiveBannerController",
            })
            return;
        }
    }
}