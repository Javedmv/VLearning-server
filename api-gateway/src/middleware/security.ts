import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { Application } from "express";
import { Service } from "../config";

export const applySecurityMiddleware = (app:Application) => {
    app.use(helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" }
    }))

    app.use(cors({
        origin:[Service.CLIENT_URL!],
        methods: ["GET","POST","HEAD","PUT","PATCH","DELETE","OPTIONS"],
        credentials:true,
        allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Range', 'Accept'],
        exposedHeaders: ['Content-Disposition','Content-Range', 'Accept-Ranges', 'Content-Length', 'Content-Type']
    }))
    
    const limiter = rateLimit({
        windowMs: 15 * 16 * 1000,
        max : 100
    })
    app.use(limiter)
};