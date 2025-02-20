import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express";
import { generateAccessToken } from "../jwt";

interface UserPayload {
    _id: string;
    email: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload
        }
    }
}

export const jwtMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { access_token, refresh_token } = req.cookies;
        if (!access_token && !refresh_token) {
            return next();
        }

        let user: UserPayload | null = null;
        
        if (access_token) {
            try {
                user = jwt.verify(
                    access_token, 
                    process.env.JWT_ACCESS_TOKEN_SECRET!
                ) as UserPayload;
            } catch (error) {
                console.log("Access token verification failed, trying refresh token");
            }
        }

        if (!user && refresh_token) {
            try {
                const refreshUser = jwt.verify(
                    refresh_token,
                    process.env.JWT_REFRESH_TOKEN_SECRET!
                ) as UserPayload;

                if (refreshUser) {
                    const cleanPayload = {
                        _id: refreshUser._id,
                        email: refreshUser.email,
                        role: refreshUser.role
                    };

                    const newAccessToken = generateAccessToken(cleanPayload);
                    
                    res.cookie("access_token", newAccessToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                    });

                    user = cleanPayload;
                }
            } catch (error) {
                console.error("Refresh token verification failed:", error);
            }
        }

        if (!user) {
            res.clearCookie("access_token");
            res.clearCookie("refresh_token");
            return next();
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in JWT middleware:", error);
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        next(error);
    }
}