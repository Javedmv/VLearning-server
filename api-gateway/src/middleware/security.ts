import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { Application } from "express";
import { Service } from "../config";

export const applySecurityMiddleware = (app:Application) => {
    app.use(helmet())

    app.use(cors({
        origin:[Service.CLIENT_URL!],
        methods: ["GET","POST","HEAD","PUT","PATCH","DELETE"],
        credentials:true,
        allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
    }))

    const limiter = rateLimit({
        windowMs: 15 * 16 * 1000,
        max : 100
    })
    app.use(limiter)
};