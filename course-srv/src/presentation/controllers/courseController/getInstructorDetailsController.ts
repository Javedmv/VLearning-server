import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { getPublicUrl } from "../../../_lib/s3/s3bucket";
import { createResponse, StatusCode } from "../../../_lib/constants";

export const getInstructorDetailsController = (dependencies:IDependencies) => {
    const {useCases: {getInstructorDetailsUseCase}} = dependencies;
    return async(req:Request,res:Response,next:NextFunction) => {
        try {
            const {id} = req.params;
            const instructorDetails = await getInstructorDetailsUseCase(dependencies).execute(id);

            if(!instructorDetails){
                res.status(StatusCode.NOT_FOUND).json(
                    createResponse(
                        StatusCode.NOT_FOUND,
                        undefined, 
                        "Instructor not found!!" 
                    )
                );
                return;
            }

            const updatedInstructor = await getPublicUrl(process.env.S3_BUCKET_NAME!,instructorDetails.profile.avatar)
            if(updatedInstructor){
                instructorDetails.profile.avatar = updatedInstructor;
            }

            res.status(StatusCode.SUCCESS).json(
                createResponse(
                    StatusCode.SUCCESS,
                    instructorDetails,
                    "Instructor details fetched successfully."
                )
            );
            return;
        } catch (error) {
            console.error("Error in getCourseDetailsController:", error);
            next(error);
        }
    }
}