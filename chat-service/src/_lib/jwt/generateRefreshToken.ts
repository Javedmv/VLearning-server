import jwt from "jsonwebtoken"

interface TokenPayload {
    _id: string;
    email: string;
    role: string;
}

export const generateRefreshToken = (payload: {
    _id: string,
    email: string,
    role: string
}) => {
    try {
        const secret = process.env.JWT_REFRESH_TOKEN_SECRET!;
        if(!secret){
            throw new Error("jwt secret not found")
        } 
        const { iat, exp, ...cleanPayload } = payload as TokenPayload & { iat?: number, exp?: number };

        return jwt.sign(cleanPayload,secret,{
            expiresIn:"30d"
        })
    } catch (error) {
        throw new Error("failed to generate Refresh token")
    }
}