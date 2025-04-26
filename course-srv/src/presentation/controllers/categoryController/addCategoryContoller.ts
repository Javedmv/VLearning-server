import { NextFunction, Response, Request, response } from "express"
import { IDependencies } from "../../../application/interfaces/IDependencies"
import { ErrorResponse } from "../../../_lib/error";
import { uploadToS3 } from "../../../_lib/s3/s3bucket";
import { createResponse, StatusCode } from "../../../_lib/constants";

export const addCategoryController = (dependencies:IDependencies) => {
    const {useCases:{addCategoryUseCase}} = dependencies;
    return async(req:Request, res:Response, next:NextFunction)=> {
        try {
            const {name ,description, status} = req.body;
            if(!name || !description || !status){
                return next(ErrorResponse.badRequest("Please fill all the fields"));
            }

            if(!req.file){
                return next(ErrorResponse.badRequest("Please add image"));
            }
            // console.log(req.file,"req.file")
            // console.log(req.file.filename, "file name");
            const filename = req.file?.filename ?? "no filename";
            const mimetype = req.file?.mimetype ?? "no mime";
            const categoryS3Path = `category/${filename}`
            
            if(filename){
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
                )
            }

            const category = {name, description, status, imageUrl:categoryS3Path}
            const response = await addCategoryUseCase(dependencies).execute(category)
            if(!response){
                return next(ErrorResponse.badRequest("Failed to add the category"));
            }
           
            res.status(StatusCode.SUCCESS).json(
                createResponse(
                    StatusCode.SUCCESS,
                    response,
                    "Category added successfully" 
                )
            );
            return;
        } catch (error) {
            console.log(error)
        }
    }
}