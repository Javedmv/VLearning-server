import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../common/error";
import jwt from "jsonwebtoken";


export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.access_token || req.headers.authorization?.split(" ")[1];
      if (!token) {
        return next(ErrorResponse.unauthorized("Token not found"));
      }
  
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET!) as {
        _id: string;
        email: string;
        role: string;
      };
  
      if (decoded.role !== "admin") {
        return next(ErrorResponse.unauthorized("Role mismatch"));
      }
  
      req.user = decoded;
  
      next();
    } catch (error) {
      console.error("Error in verifying admin:", error);
      return next(ErrorResponse.unauthorized("Invalid or expired token"));
    }
  };