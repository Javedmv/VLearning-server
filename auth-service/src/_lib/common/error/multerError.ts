import { Request, Response, NextFunction } from "express";
import multer from "multer";

export const multerError = (
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    console.error(err);
    
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ 
            error: 'File upload error', 
            message: err.message 
        });
    } 
    
    res.status(500).json({ 
        error: 'Server error', 
        message: err instanceof Error ? err.message : 'Unknown error'
    });
    next()
};