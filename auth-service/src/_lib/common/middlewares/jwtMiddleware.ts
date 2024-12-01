import jwt from "jsonwebtoken"
import { Request,Response,NextFunction } from "express"
import { generateAccessToken } from "../../jwt"

interface UserPayload {
    _id: string,
    email: string,
    role: string
}

declare global{
    namespace Express {
        interface Request {
            user?: UserPayload
        }
    }
}

export const jwtMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        console.log(req.body)
        // console.log("Full cookies:", req.cookies);
        // console.log("Access token:", req.cookies.access_token);
        // console.log("Refresh token:", req.cookies.refresh_token);

        const {access_token, refresh_token } = req.cookies
        
        
        if (!access_token && !refresh_token) {
            return next();
        }

        let user;

        if (access_token) {
            user = jwt.verify(access_token, process.env.JWT_ACCESS_TOKEN_SECRET!) as UserPayload
        }

        if(!user && refresh_token){
            user = jwt.verify(refresh_token,process.env.JWT_REFRESH_TOKEN_SECRET!) as UserPayload
            if(user){
                const nwAccessToken = generateAccessToken(user);
                res.cookie("access_token", nwAccessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite:"none",
                });
            }
        }
        req.user = user;
        
        next();
    } catch (error) {
        console.error("Error in JWT middleware:",error)
        next(error)
    }
}