import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const adminBlockUserController = (dependencies:IDependencies) => {
    const { useCases: {blockUserUseCase} } = dependencies;

    return async(req:Request, res:Response, next:NextFunction) => {
        try {
            const userId = req.params?.id;
            const isBlocked = req.body?.isBlocked;

            console.log(userId,isBlocked, "in user controller")

            const studentUsers = await blockUserUseCase(dependencies).execute(userId,isBlocked);


            res.status(200).json({
                success:true,
                data: studentUsers,
                message: `User Has Been ${studentUsers?.isBlocked? "Unblocked" : "Blocked"} Successfully.`
            })

        } catch (error) {
            console.log(error, "error in ADMIN BLOCK UNBLOCK STUDENT CONTROLLER")
            next(error)
        }
    }
}