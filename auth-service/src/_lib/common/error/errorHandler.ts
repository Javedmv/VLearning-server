import { Request, Response, NextFunction } from "express";
import ErrorResponse from "./errorResponse";

const errorHandler = (err: any, req:Request, res:Response, next: NextFunction) => {
    console.log("yes error handler is executed",err)
    if(err instanceof ErrorResponse){
            res.status(err.status).json({
            success: false,
            status: err.status,
            message: err.message
        })
        return;
    }

    res.status(400).json({
        success: false,
        status: err?.status || 400,
        message: "Internal Server Error",
    })
    return;
};

export default errorHandler;