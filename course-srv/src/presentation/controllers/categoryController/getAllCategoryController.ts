import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { CategoryEntity } from "../../../domain/entities";
import { getPublicUrl } from "../../../_lib/s3/s3bucket";
import { createResponse, StatusCode } from "../../../_lib/constants";
import { CourseFilters } from "../../../domain/entities/CourseFilter";

export const getAllCategoryController = (dependencies: IDependencies) => {
    const { useCases: { getAllCategoryUseCase } } = dependencies;

    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // Assuming req.user is a property added through some middleware for authentication
            if (!req.user) {
                res.status(401).json({ success: false, message: "Authentication required: No User Provided" });
                return;
            }
            const { page, limit } = req.query;
            const filters:CourseFilters = {
                page: parseInt(page as string) || 1,
                limit: parseInt(limit as string) || 8,
            };

            const result = await getAllCategoryUseCase(dependencies).execute(filters);
            if (!result) {
                res.status(StatusCode.NOT_FOUND).json(
                    createResponse(
                        StatusCode.NOT_FOUND,
                        null,
                        "No categories found"
                    )
                );
                return;
            }
            const { categorys, totalCategories } = result;
            if(categorys){
                for (const cat of categorys) {
                    if (cat?.imageUrl) {
                        const publicCategoryUrl = await getPublicUrl(process.env.S3_BUCKET_NAME!,cat?.imageUrl)
                        cat.imageUrl= publicCategoryUrl
                    }
                }
            }
            const totalPages = Math.ceil(totalCategories / filters.limit);
            const meta = {
                page: filters.page,
                limit: filters.limit,
                total: totalCategories,
                totalPages
            };

            res.status(StatusCode.SUCCESS).json(
                createResponse(
                    StatusCode.SUCCESS,
                    {categorys,meta}, 
                    "Categories retrieved successfully" 
                )
            );
            return;
        } catch (error) {
            next(error);
        }
    };
};