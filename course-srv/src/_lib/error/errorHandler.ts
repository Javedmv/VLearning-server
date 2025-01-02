import { NextFunction, Request, Response } from "express";
import ErrorResponse from "./errorResponse";

const errorHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
    if(err instanceof ErrorResponse){
        res.status(err.status).json({
            success: false,
            status: err.status,
            message: err.message
        })
        return;
    }
    console.log(err);
    
    res.status(400).json({
        success:false,
        status: err?.status || 400,
        message: "Internal Server Error"
    })
    return;
}

export default errorHandler;