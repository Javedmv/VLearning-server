import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { ErrorResponse } from "../../../_lib/error";
import { createResponse, StatusCode } from "../../../_lib/constants";

export const deleteCategoryController = (dependencies: IDependencies) => {
    const { useCases: { deleteCategoryUseCase } } = dependencies;
    
    return async (req: Request, res: Response, next: NextFunction) => {
        
        try {
            const catId = req?.params?.catId;
            if (!catId?.trim()) {
                return next(ErrorResponse.badRequest("Please select a category."));
            }

            const deletedCategory = await deleteCategoryUseCase(dependencies).execute(catId);
            
            if (!deletedCategory) {
                return next(ErrorResponse.notFound("Category not found."));
            }

            res.status(StatusCode.SUCCESS).json(
                createResponse(
                    StatusCode.SUCCESS,
                    deletedCategory, 
                    "Category deleted successfully" 
                )
            );
            return

        } catch (error) {
            if (error instanceof ErrorResponse) {
                return next(error);
            }

            return next(ErrorResponse.internalError("Failed to delete category"));
        }
    };
};