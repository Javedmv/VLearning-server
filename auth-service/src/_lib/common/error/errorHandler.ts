import { Request, Response, NextFunction } from "express";
import ErrorResponse from "./errorResponse";

const errorHandler = (err: any, req:Request, res:Response, next: NextFunction): any => {
    console.log("yes error handler is executed")
    if(err instanceof ErrorResponse){
        return res.status(err.status).json({
            success: false,
            message: err.message,
            status: err.status
        })
    }

    return res.status(400).json({
        success: false,
        status: err.status || 500,
        message: "Internal Server Error",
    })
};

export default errorHandler;