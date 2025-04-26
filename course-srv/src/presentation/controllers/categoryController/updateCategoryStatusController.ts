import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { ErrorResponse } from "../../../_lib/error";
import { createResponse, StatusCode } from "../../../_lib/constants";

export const updateCategoryStatusController = (dependencies:IDependencies) => {
    const {useCases: {updateCategoryStatusUseCase}} = dependencies;
    return async (req:Request, res:Response, next: NextFunction) => {
        try {
            const catId = req.params.catId;
            const status = req.body.status;

            if(!catId || status === undefined){
                return next(ErrorResponse.badRequest("Sorry something went wrong."))
            }

            const updatedStatus = await updateCategoryStatusUseCase(dependencies).execute(catId,status);
            if(!updatedStatus){
                return next(ErrorResponse.badRequest("failed to update status,please try again."))
            }
            res.status(StatusCode.SUCCESS).json(
                createResponse(
                    StatusCode.SUCCESS,
                    undefined, 
                    "Category status updated successfully"
                )
            );
            return;
        } catch (error) {
            console.log(error)
        }
    }
}