import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { getPublicUrl } from "../../_lib/s3/s3bucket";

export const adminGetAllInstructorsController = (dependencies:IDependencies) => {
    const {useCases: {getAllInstructorsUseCase} } = dependencies;

    return async (req:Request, res:Response, next:NextFunction) => {
        try {
            if(!req.user){
                res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                })
                return;
            }
            const {page ,limit , search} = req.query;
            const filters = {
                page: parseInt(page as string, 10) || 1,
                limit: parseInt(limit as string, 10) || 8,
                search: search?.toString() as string || "",
            }
            const {  instructorUser = [],  totalInstructor = 0 } = await getAllInstructorsUseCase(dependencies).execute(filters);
            
            if(instructorUser){
                for (const user of instructorUser) {
                    if (user?.profile?.avatar) {
                        const publicAvatarUrl = await getPublicUrl(process.env.S3_BUCKET_NAME!,user?.profile?.avatar)
                        user.profile.avatar = publicAvatarUrl
                    }
                    if(user?.cv){
                        const publicCvUrl = await getPublicUrl(process.env.S3_BUCKET_NAME!,user?.cv)
                        user.cv = publicCvUrl;
                    }
                }
            }
            const totalPages = Math.ceil(totalInstructor / filters.limit);
            
            res.status(200).json({
                success:true,
                data: instructorUser,
                message: "Successfully fetched all instructor user!!",
                totalPages: totalPages,
                total: totalInstructor
            })
            return;
        } catch (error) {
            console.log(error, "ERROR IN ADMIN GET ALL INSTRUCTOR CONTROLLER")
            next(error)
        }
    }
}