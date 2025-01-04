import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { uploadToS3 } from "../../_lib/s3/s3bucket";
import { ErrorResponse } from "../../_lib/error";

export const updateCategoryController = (dependencies: IDependencies) => {
    const {useCases: {updateCategoryUseCase}} = dependencies;
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const catId = req.params.catId;
            const { name, description, status } = req.body;

            const categoryUpdate: Record<string, any> = {};

            if (name && name.length >= 3 && name.trim()) categoryUpdate.name = name.trim();
            if (description && description.length >= 10 && description.trim()) categoryUpdate.description = description.trim();
            
            if (status !== undefined) {
                categoryUpdate.status = status === 'true' || status === true;
            }

            if (req.file) {
                const filename = req.file.filename;
                const categoryS3Path = `category/${filename}`;
                const mimetype = req.file.mimetype;

                try {
                    await uploadToS3(
                        req.file.path,
                        process.env.S3_BUCKET_NAME!,
                        categoryS3Path,
                        {
                            contentType: mimetype,
                            metadata: {
                                'x-amz-meta-original-filename': req.file.originalname,
                                'x-amz-meta-file-size': req.file.size.toString(),
                                'x-amz-meta-upload-date': new Date().toISOString()
                            }
                        }
                    );
                    
                    // Only add imageUrl if S3 upload was successful
                    categoryUpdate.imageUrl = categoryS3Path;
                } catch (error) {
                    console.error('S3 upload error:', error);
                    res.status(500).json({
                        success: false,
                        message: "Failed to upload image"
                    });
                    return;
                }
            }

            
            const updatedCategory = await updateCategoryUseCase(dependencies).execute(catId,categoryUpdate);
            console.log('Category Update Object:', updatedCategory);

            if(!updatedCategory){
                return next(ErrorResponse.badRequest("Something went wrong, please try again."))
            }

            res.status(200).json({
                success: true,
                message: "Category updated successfully",
            });
            return;
        } catch (error) {
            console.error('Update category error:', error);
            res.status(500).json({
                success: false,
                message: "Failed to update category"
            });
            return
        }
    };
};