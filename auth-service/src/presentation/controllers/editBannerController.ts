import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { removeFilesFromS3, uploadToS3 } from "../../_lib/s3/s3bucket";

interface CustomRequest extends Request {
    files: {
        [fieldname: string]: Express.Multer.File[];
    };
}

export const editBannerController = (dependencies:IDependencies) => {
    const { useCases: { editBannerUseCase} } = dependencies;
    return async (req:Request,res:Response,next:NextFunction) => {
        try {
            const { title, status, type, description = "" , priority='low', _id} = req.body;
            const { banner } = req.body.files;
            console.log(banner, title, status, type ,description, priority)

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

            const sendData: { 
                _id: string;
                title: string; 
                status: boolean; 
                type: 'promotional' | 'announcement' | 'sale'; 
                description: string; 
                priority: 'high' | 'medium' | 'low'; 
                imageUrl?: string;
            } = {
                title,
                status,
                type,
                description,
                priority,
                _id
            };
            
            if(banner){
                sendData.imageUrl = bannerS3Path
            }

            const result = await editBannerUseCase(dependencies).execute(sendData);

            if(result && result !== ""){
                console.log(result);
                await removeFilesFromS3(result);
            }

            res.status(200).json({
                success:true,
                message:"Banner Updated Successfully."
            })
            return;
        } catch (error) {
            next(error);
        }
    }
}