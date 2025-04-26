import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { createResponse, StatusCode } from "../../_lib/common";

export const adminGetProfileController = (dependencies:IDependencies) => {
    const {useCases: {findUserByEmailUseCase}} = dependencies;

    return async (req:Request, res:Response, next:NextFunction) => {
        try {
            const email = req.user?.email!;
            const adminUser = await findUserByEmailUseCase(dependencies).execute(email);
            const data = {
                _id: adminUser?._id,
                username: adminUser?.username,
                email: adminUser?.email,
                firstName: adminUser?.firstName,
                lastName: adminUser?.lastName,
                phoneNumber : adminUser?.phoneNumber,
                profile: {
                    dob: adminUser?.profile?.dob,
                    avatar: adminUser?.profile?.avatar
                }
            }
            
            res.status(StatusCode.SUCCESS).json(
                createResponse(
                    StatusCode.SUCCESS,
                    data,
                    "Successfully fetched admin profile"
                )
            );
        } catch (error) {
            console.log(error, "ERROR IN ADMIN GET PROFILE CONTROLLER")
            next(error)
        }
    }
}