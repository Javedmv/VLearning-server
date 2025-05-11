import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { Application } from "express";

export const applySecurityMiddleware = (app: Application) => {

    // Apply Helmet with CORS-friendly settings
    app.use(helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
    }));

    const allowedOrigins = ["https://v-learning-client-5r8j.vercel.app"];

    // Configure CORS properly
    app.use(cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE", "OPTIONS"],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Range', 'Accept', 'X-Requested-With', 'X-Forwarded-For'],
        exposedHeaders: ['Content-Disposition', 'Content-Range', 'Accept-Ranges', 'Content-Length', 'Content-Type']
    }));

    // Apply rate limiter if needed
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100,
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false,
    });

    app.use(limiter);
};