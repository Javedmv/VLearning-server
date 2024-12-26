import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { uploadToS3 } from "../../_lib/s3/s3bucket";
import { ErrorResponse } from "../../_lib/common/error";

interface CustomRequest extends Request {
    files: {
        [fieldname: string]: Express.Multer.File[];
    };
}

export const postInstructorReapplyController = (dependencies:IDependencies) => {
    const {useCases:{updateCvUseCase}} = dependencies;
    return async (req:Request,res:Response,next:NextFunction): Promise<void> => {
        try {
            const userId = req.user?._id
            const {profession, profileDescription, files: {cv}} = req.body;
            const cvFilename = (req.files as CustomRequest["files"])?.['files.cv']?.[0]?.filename || "No CV uploaded";
            const cvS3Path = cv ? `cv/${cvFilename}_${Date.now()}` : '';
            if(cv){
                await uploadToS3(
                cv, 
                process.env.S3_BUCKET_NAME!, 
                cvS3Path, 
                {
                    contentType: (req.files as CustomRequest["files"])?.['files.cv']?.[0]?.mimetype,
                    metadata: {
                        'x-amz-meta-original-filename': (req.files as CustomRequest["files"])?.['files.cv']?.[0]?.originalname,
                        'x-amz-meta-file-size': (req.files as CustomRequest["files"])?.['files.cv']?.[0]?.size.toString(),
                        'x-amz-meta-upload-date': new Date().toISOString()
                    }
                }
            )
            }
            const args: string[] = [userId, profession, profileDescription];
            if (cvS3Path && cvS3Path !== "") {
                args.push(cvS3Path);
            }
            if(args.length !== 4){
                return next(ErrorResponse.badRequest("All field must be filled."));
            }
            const result = await updateCvUseCase(dependencies).execute(args)
            if(result){
                const {_id, email, role , username, isNewUser, isBlocked, isVerified, profession, profileDescription} = result;
                res.status(200).json({success: true, data: {_id, email, role, username, isNewUser,isBlocked, isVerified, profession, profileDescription},message:"Reapply Completed successfully."});
                return
            }
            res.status(404).json({success: false, message:"Sorry, failed to reapply please try again."})
            return;
        } catch (error:any) {
            next(error);
        }
    }
}