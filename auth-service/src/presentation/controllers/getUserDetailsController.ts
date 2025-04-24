import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { UserEntity } from "../../domain/entities";
import { getPublicUrl } from "../../_lib/s3/s3bucket";


export const getUserDetailsController = (dependencies:IDependencies) => {
    const {useCases:{findUserByIdUseCase}} = dependencies;
    return async(req:Request, res:Response, next:NextFunction): Promise<void> => {
        try {
            const userId = req.params?.id!;
            const user = await findUserByIdUseCase(dependencies).execute(userId);
            console.log(user)
            if (user?.profile?.avatar) {
                const publicAvatarUrl = await getPublicUrl(process.env.S3_BUCKET_NAME!,user?.profile?.avatar)
                user.profile.avatar = publicAvatarUrl
            }
            if(user?.cv){
                const publicCvUrl = await getPublicUrl(process.env.S3_BUCKET_NAME!,user?.cv)
                user.cv = publicCvUrl;
            }
            res.status(200).json({
                success: true,
                data: user,
            })
            return;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error, "ERROR IN GET USER DETAILS CONTROLLER:", error.message);
            } else {
                console.error("Unknown error in GET USER DETAILS CONTROLLER:", error);
            }
            next(error);
        }
        
    }
}