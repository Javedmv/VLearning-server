import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";

export const getTrueCategoryController = (dependencies:IDependencies) => {
    const {useCases: {getActiveCategoryUseCase}} = dependencies;
    return async(req:Request,res: Response, next:NextFunction) => {
        try {
            // if (!req.user) {
            //     res.status(401).json({ success: false, message: "Authentication required: No User Provided" });
            //     return;
            // }
            const categories = await getActiveCategoryUseCase(dependencies).execute();
    
            // TODO:if getting images in future make sure you uncomment it 
            // if(categories){
            //     for (const cat of categories) {
            //         if (cat?.imageUrl) {
            //             const publicCategoryUrl = await getPublicUrl(process.env.S3_BUCKET_NAME!,cat?.imageUrl)
            //             cat.imageUrl= publicCategoryUrl
            //         }
            //     }
            // }
            res.status(200).json({
                success: true,
                data: categories,
                message: `Categories retrieved successfully`
            });
            return;
        } catch (error) {
            next(error)
        }
    }
}