import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies";
import { createResponse, StatusCode } from "../../_lib/common";

export const toggleBannerStatusController = (dependencies: IDependencies) => {
    const {useCases: {toggleBannerStatusUseCase}} = dependencies;
    return async(req:Request, res:Response, next: NextFunction) => {
        try {
            const bannerId = req.params.id;
            const currentStatus = req.body.status;
            const response = await toggleBannerStatusUseCase(dependencies).execute(bannerId,currentStatus);

            if(!response){
                res.status(StatusCode.NOT_FOUND).json(
                    createResponse(
                        StatusCode.NOT_FOUND,
                        undefined, 
                        "Something went wrong, please try again" 
                    )
                );
                return;
            }
            res.status(StatusCode.SUCCESS).json(
                createResponse(
                    StatusCode.SUCCESS,
                    undefined, 
                    "Status updated successfully"
                )
            );
            return;
        } catch (error) {
            console.error(error, "Something went wrong in user signup");
        }
    }
}