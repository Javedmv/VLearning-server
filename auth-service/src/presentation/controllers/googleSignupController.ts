import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { ErrorResponse } from "../../_lib/common/error";
import { generateAccessToken, generateRefreshToken } from "../../_lib/jwt";
import { UserEntity } from "../../domain/entities";
import { createResponse, StatusCode } from "../../_lib/common";

export const googleSignupController = (dependencies: IDependencies) => {
    const { useCases: { createGAuthUserUseCase } } = dependencies;
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { decoded } = req.body;
            if (!decoded.email || !decoded.name) {
                return next(ErrorResponse.badRequest("Email and name are required"));
            }
            
            const user = await createGAuthUserUseCase(dependencies).execute({ 
                email: decoded.email, 
                name: decoded.name 
            });
            
            const { _id, email, username, role, isNewUser, isBlocked, isVerified, profession, profileDescription } = user as UserEntity;
            
            if (isBlocked) {
                return next(ErrorResponse.unauthorized("Sorry, Your Account Is Blocked!"));
            }
            
            const accessToken = generateAccessToken({
                _id: String(_id),
                email: email,
                role: role
            });

            const refreshToken = generateRefreshToken({
                _id: String(_id),
                email: email,
                role: role
            });

            res.cookie("access_token", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 24 * 60 * 60 * 1000 
            });
            
            res.cookie("refresh_token", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            });
            
            if (isNewUser) {
                res.status(StatusCode.SUCCESS).json(
                    createResponse(
                        StatusCode.SUCCESS,
                        { _id, email, role, username, isNewUser }, // Pass user data as part of the response
                        "User created!"
                    )
                );
                return;
            } else {
                res.status(StatusCode.SUCCESS).json(
                    createResponse(
                        StatusCode.SUCCESS,
                        { _id, email, role, username, isNewUser, isBlocked, isVerified, profession, profileDescription }, // Pass user data as part of the response
                        "Login Successful!"
                    )
                );
                return;
            }

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error, "ERROR IN GET USER DETAILS CONTROLLER:", error.message);
            } else {
                console.error("Unknown error in GET USER DETAILS CONTROLLER:", error);
            }
            next(error);
        }
        
    };
};