import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { Application } from "express";
import { Service } from "../config";

export const applySecurityMiddleware = (app: Application) => {
    // Apply Helmet with CORS-friendly settings
    app.use(helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
    }));

    // Configure CORS properly
    app.use(cors({
        origin: [Service.CLIENT_URL, "https://welearning.online"],
        methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE", "OPTIONS"],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Range', 'Accept', 'X-Requested-With'],
        exposedHeaders: ['Content-Disposition', 'Content-Range', 'Accept-Ranges', 'Content-Length', 'Content-Type']
    }));

    // Apply rate limiter if needed
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100
    });
    app.use(limiter);
};