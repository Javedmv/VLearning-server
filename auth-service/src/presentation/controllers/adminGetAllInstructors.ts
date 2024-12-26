import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { getPublicUrl } from "../../_lib/s3/s3bucket";

export const adminGetAllInstructorsController = (dependencies:IDependencies) => {
    const {useCases: {getAllInstructorsUseCase} } = dependencies;

    return async (req:Request, res:Response, next:NextFunction) => {
        try {
            const InstructorUsers = await getAllInstructorsUseCase(dependencies).execute()
            if(InstructorUsers){
                for (const user of InstructorUsers) {
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
                
            res.status(200).json({
                success:true,
                data: InstructorUsers,
                message: "Successfully fetched all instructor user!!"
            })
        } catch (error) {
            console.log(error, "ERROR IN ADMIN GET ALL INSTRUCTOR CONTROLLER")
            next(error)
        }
    }
}