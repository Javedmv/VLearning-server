import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { Application } from "express";
import { Service } from "../config";

export const applySecurityMiddleware = (app: Application) => {
    // Add request logging
    // app.use((req: Request, res: Response, next: NextFunction) => {
    //     console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    //     console.log('Headers:', JSON.stringify(req.headers));
    //     next();
    // });

    // app.use(helmet({
    //     crossOriginResourcePolicy: { policy: "cross-origin" },
    // }));

    // console.log('Setting up CORS with client URL:', Service.CLIENT_URL);
    
    app.use(cors({
        origin: "*",
        methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE", "OPTIONS"],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Range', 'Accept'],
        exposedHeaders: ['Content-Disposition', 'Content-Range', 'Accept-Ranges', 'Content-Length', 'Content-Type']
    }));
    
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes (fixed from 15 * 16 * 1000 which was incorrect)
        max: 100
    });
    
    app.use(limiter);
};