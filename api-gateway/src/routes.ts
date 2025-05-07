import { Application, Request, Response } from "express";
import proxy from "express-http-proxy";
import { Service } from "./config";

// Helper function for multipart/form-data routes
const createMultipartProxy = (serviceUrl: string) => {
    return proxy(serviceUrl, {
        proxyReqPathResolver(req) {
            console.log(`Creating multipart proxy for ${serviceUrl}${req.url}`);
            return "/multipart" + req.url;
        },
        parseReqBody: false,
        reqBodyEncoding: null,
        proxyErrorHandler: function(err, res, next) {
            console.error(`Multipart proxy error for ${serviceUrl}: ${err.message}`);
            res.status(500).json({ error: `Service temporarily unavailable: ${err.message}` });
        }
    });
};

// Helper function for regular JSON/urlencoded routes
const createRegularProxy = (serviceUrl: string) => {
    return proxy(serviceUrl, {
        proxyReqPathResolver(req) {
            console.log(`Proxying request to ${serviceUrl}${req.url}`);
            return req.url;
        },
        userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
            console.log(`Response from ${serviceUrl}${userReq.url}: Status ${proxyRes.statusCode}`);
            try {
                return proxyResData;
            } catch (e) {
                console.error('Error in response decorator:', e);
                return proxyResData;
            }
        },
        proxyErrorHandler: function(err, res, next) {
            console.error(`Proxy error for ${serviceUrl}: ${err.message}`);
            res.status(500).json({ error: `Service temporarily unavailable: ${err.message}` });
        },
        timeout: 60000
    });
};

export const routes = (app: Application) => {
    // Add a root health check endpoint
    app.get("/", (req: Request, res: Response) => {
        res.status(200).json({ status: "API Gateway is running", services: Object.keys(Service) });
    });
    
    app.get("/health", (req: Request, res: Response) => {
        res.status(200).json({ status: "API Gateway is running" });
    });

    // Use multipart proxy only for file upload routes
    app.use("/auth/multipart", createMultipartProxy(Service.AUTH_SERVICE_URL));
    // Use regular proxy for other auth routes
    app.use("/auth", createRegularProxy(Service.AUTH_SERVICE_URL));
    
    app.use("/notification", createRegularProxy(Service.NOTIFICATION_SERVICE_URL));
    
    // Use multipart proxy only for file upload routes
    app.use("/course/multipart", createMultipartProxy(Service.COURSE_SERVICE_URL));
    // Use regular proxy for other course routes
    app.use("/course", createRegularProxy(Service.COURSE_SERVICE_URL));
    
    app.use("/payment", createRegularProxy(Service.PAYMENT_SERVICE_URL));
    
    app.use("/chat", createRegularProxy(Service.CHAT_SERVICE_URL));
    
    // Improve 404 handling with more information
    app.use("*", (req: Request, res: Response) => {
        console.log(`404 Not Found: ${req.method} ${req.originalUrl}`);
        res.status(404).json({
            error: "Route not found", 
            path: req.originalUrl,
            availableRoutes: [
                "/health",
                "/auth/*",
                "/notification/*",
                "/course/*",
                "/payment/*",
                "/chat/*"
            ]
        });
    });
};