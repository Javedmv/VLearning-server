import jwt from "jsonwebtoken"

interface TokenPayload {
    _id: string;
    email: string;
    role: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
    try {
        const secret = process.env.JWT_ACCESS_TOKEN_SECRET;
        if(!secret){
            throw new Error("JWT_ACCESS_TOKEN_SECRET is not defined");
        }

        const { iat, exp, ...cleanPayload } = payload as TokenPayload & { iat?: number, exp?: number };

        return jwt.sign(cleanPayload, secret, {
            expiresIn: "24h"
        });
    } catch (error) {
        console.error("Token generation error:", error);
        throw new Error("Failed to generate access token.");
    }
}