import jwt from "jsonwebtoken"

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
       return jwt.sign(payload,secret,{expiresIn:"30d"})
    } catch (error) {
        throw new Error("failed to generate Refresh token")
    }
}