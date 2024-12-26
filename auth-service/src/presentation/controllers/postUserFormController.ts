import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
// import { userFormValidation } from "../../_lib/validation/userFromValidatiaon";
import { uploadToS3 } from "../../_lib/s3/s3bucket";

interface CustomRequest extends Request {
    files: {
        [fieldname: string]: Express.Multer.File[];
    };
}


export const postUserFormController = (dependencies:IDependencies) => {
    
    const { useCases: {formSubmitByEmailUseCase}} = dependencies

    return async(req:Request, res:Response, next:NextFunction) => {
        try {
            const { username,firstName , lastName, email, phoneNumber , role, profile : {dob, gender} , profession , profileDescription , isNewUser , files:{avatar: avatarLocalDestination,cv: cvLocalDestination}, qualification, contact} = req.body;
            
            const avatarFilename = (req.files as CustomRequest["files"])?.['files.avatar']?.[0]?.filename || "No avatar uploaded";
            const cvFilename = (req.files as CustomRequest["files"])?.['files.cv']?.[0]?.filename || "No CV uploaded";
            
            // TODO: Need to validata the req.body & req.files

            const avatarS3Path = avatarLocalDestination ? `avatars/${avatarFilename}_${Date.now()}` : '';
            const cvS3Path = cvLocalDestination ? `cv/${cvFilename}_${Date.now()}` : '';
            
            // await uploadToS3(avatarLocalDestination, process.env.S3_BUCKET_NAME!, avatarFilename,  {contentType: ,metadata:} )
            if(avatarLocalDestination){
                    await uploadToS3(
                    avatarLocalDestination, 
                    process.env.S3_BUCKET_NAME!, 
                    avatarS3Path,
                    {
                        contentType: (req.files as CustomRequest["files"])?.['files.avatar']?.[0]?.mimetype, 
                        metadata: {
                            'x-amz-meta-original-filename': (req.files as CustomRequest["files"])?.['files.avatar']?.[0]?.originalname,
                            'x-amz-meta-file-size': (req.files as CustomRequest["files"])?.['files.avatar']?.[0]?.size.toString(),
                            'x-amz-meta-upload-date': new Date().toISOString()
                        }
                    }
                )
            }

            if(cvLocalDestination){
                    await uploadToS3(
                    cvLocalDestination, 
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

            // TODO: need to remove unnecessay data from req.body before sending

            const result = await formSubmitByEmailUseCase(dependencies).execute({
                ...req.body,
                ...(avatarS3Path && avatarS3Path !== "" && {avatarPath: avatarS3Path}),
                ...(cvS3Path && cvS3Path !== "" && {cvPath: cvS3Path})
            })
            
            
            if (!Object.keys(req.body).length) {
                res.status(400).json({
                    success: false,
                    message: 'No form data received'
                });
                return;
            }
            if(result){
                const {_id, email, role , username, isNewUser, isBlocked, isVerified, profession, profileDescription} = result;
                res.status(200).json({success: true, data: {_id, email, role, username, isNewUser,isBlocked, isVerified, profession, profileDescription}});
            }
        } catch (error) {
            next(error);
        }
    }
}