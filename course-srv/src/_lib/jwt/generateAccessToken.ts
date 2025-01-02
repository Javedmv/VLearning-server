import jwt from "jsonwebtoken"

export const generateAccessToken = (payload:{
    _id:string,
    email:string,
    role:string
}) => {
    try {
        const secret = process.env.JWT_ACCESS_TOKEN_SECRET!;
        if(!secret){
            throw new Error("Access token not defined")
        }

        // const {_id,email,role} = payload;
        return jwt.sign(payload,secret,{expiresIn:"24h"})
    } catch (error) {
        throw new Error("Failed to generate access token.");
    }
}