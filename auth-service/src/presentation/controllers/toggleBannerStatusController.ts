import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies";

export const toggleBannerStatusController = (dependencies: IDependencies) => {
    const {useCases: {toggleBannerStatusUseCase}} = dependencies;
    return async(req:Request, res:Response, next: NextFunction) => {
        try {
            const bannerId = req.params.id;
            const currentStatus = req.body.status;
            const response = await toggleBannerStatusUseCase(dependencies).execute(bannerId,currentStatus);

            if(!response){
                res.status(404).json({
                    success:false,
                    message:"Something went wrong please try again"
                })
                return;
            }
            res.status(200).json({
                success: true,
                message: "Status updated successfully"
            })
            return;
        } catch (error) {
            console.error(error, "Something went wrong in user signup");
        }
    }
}