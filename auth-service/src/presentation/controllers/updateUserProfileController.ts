import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"

export const updateUserProfileController = (dependencies:IDependencies) => {
    const {useCases:{updateProfileUseCase}} = dependencies;
    return async (req:Request,res:Response,next:NextFunction) => {
        try {
            const userId = req.user?._id!;
            const data = req?.body!;
            const result = await updateProfileUseCase(dependencies).execute(userId,data)
            console.log(result,"response in controller of update Profile")
            if(result){
                const {_id, email, role , username, isNewUser} = result;
                res.status(200).json({success: true, data: {_id, email, role, username, isNewUser}})
                return;
            }

        } catch (error) {
            next(error)
        }
    }
} 