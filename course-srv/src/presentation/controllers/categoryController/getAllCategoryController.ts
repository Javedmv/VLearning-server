import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { CategoryEntity } from "../../../domain/entities";
import { getPublicUrl } from "../../../_lib/s3/s3bucket";
import { createResponse, StatusCode } from "../../../_lib/constants";

export const getAllCategoryController = (dependencies: IDependencies) => {
    const { useCases: { getAllCategoryUseCase } } = dependencies;

    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // Assuming req.user is a property added through some middleware for authentication
            if (!req.user) {
                res.status(401).json({ success: false, message: "Authentication required: No User Provided" });
                return;
            }

            const categories = await getAllCategoryUseCase(dependencies).execute();
            if(categories){
                for (const cat of categories) {
                    if (cat?.imageUrl) {
                        const publicCategoryUrl = await getPublicUrl(process.env.S3_BUCKET_NAME!,cat?.imageUrl)
                        cat.imageUrl= publicCategoryUrl
                    }
                }
            }

            res.status(StatusCode.SUCCESS).json(
                createResponse(
                    StatusCode.SUCCESS,
                    categories, 
                    "Categories retrieved successfully" 
                )
            );
            return;
        } catch (error) {
            next(error);
        }
    };
};