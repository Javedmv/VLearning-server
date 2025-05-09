import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { uploadToS3 } from "../../_lib/s3/s3bucket";
import { createResponse, StatusCode } from "../../_lib/common";

interface CustomRequest extends Request {
    files: {
        [fieldname: string]: Express.Multer.File[];
    };
}

export const addBannerController = (dependencies:IDependencies) => {
    const {useCases: {addBannerUseCase}} = dependencies;
    return async(req:Request, res:Response, next:NextFunction) => {
        try {
            const { title, status, type, description , priority='low'} = req.body;
            const { banner } = req.body.files;

            const bannerFilename = (req.files as CustomRequest["files"])?.['files.banner']?.[0]?.filename || "No avatar uploaded";
            const bannerS3Path = banner ? `banner/${bannerFilename}` : '';

            if(banner){
                await uploadToS3(
                banner, 
                process.env.S3_BUCKET_NAME!, 
                bannerS3Path, 
                {
                    contentType: (req.files as CustomRequest["files"])?.['files.cv']?.[0]?.mimetype,
                    metadata: {
                        'x-amz-meta-original-filename': (req.files as CustomRequest["files"])?.['files.banner']?.[0]?.originalname,
                        'x-amz-meta-file-size': (req.files as CustomRequest["files"])?.['files.banner']?.[0]?.size.toString(),
                        'x-amz-meta-upload-date': new Date().toISOString()
                    }
                }
            )}
            
            const result = await addBannerUseCase(dependencies).execute({title, status, type, imageUrl: bannerS3Path ,description, priority});
            if(!result){
                res.status(404).json({
                    success: false,
                    message: "Banner creation failed",
                })
                return
            }

            const response = createResponse(StatusCode.SUCCESS, result);
            res.status(StatusCode.SUCCESS).json(response)
            return;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Error:", error.message);
            } else {
                console.log("Banner adding error:", error);
            }
        }
    }
}