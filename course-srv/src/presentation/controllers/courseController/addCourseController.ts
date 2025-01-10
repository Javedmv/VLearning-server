import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { ErrorResponse } from "../../../_lib/error";

export const addCourseController = (dependencies:IDependencies) => {
    const {useCases:{addCourseUseCase}} = dependencies;
    return async (req:Request,res:Response, next:NextFunction) => {
        try {
            if(!req.body){
                return next(ErrorResponse.badRequest("please do add the course to complete the process"))
            }
            if (!req.user) {
                res.status(401).json({ success: false, message: "Authentication required: No User Provided" });
                return;
            }
            const response = await addCourseUseCase(dependencies).execute(req.body, req?.user?._id)
            res.status(200).json({
                success: true,
                data: response,
                message: "Course added successfully"
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}