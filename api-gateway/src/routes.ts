// Updated routes.ts file with improved logging and error handling
import { Application, Request, Response } from "express";
import proxy from "express-http-proxy";
import { Service } from "./config";

// Helper function for multipart/form-data routes
const createMultipartProxy = (serviceUrl: string) => {
    return proxy(serviceUrl, {
        proxyReqPathResolver(req) {
            console.log(`Multipart proxy: ${serviceUrl}${req.url}`);
            return "/multipart" + req.url;
        },
        parseReqBody: false,
        reqBodyEncoding: null,
        proxyErrorHandler: function(err, res, next) {
            console.error(`Multipart proxy error for ${serviceUrl}: ${err.message}`);
            res.status(500).json({ error: `Service unavailable: ${err.message}` });
        }
    });
};

// Helper function for regular JSON/urlencoded routes
const createRegularProxy = (serviceUrl: string) => {
    return proxy(serviceUrl, {
        proxyReqPathResolver(req) {
            console.log(`Regular proxy: ${serviceUrl}${req.url}`);
            return req.url;
        },
        userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
            console.log(`Response from ${serviceUrl}${userReq.url}: Status ${proxyRes.statusCode}`);
            // Don't modify headers that might cause redirects
            return proxyResData;
        },
        proxyErrorHandler: function(err, res, next) {
            console.error(`Proxy error for ${serviceUrl}: ${err.message}`);
            res.status(500).json({ error: `Service unavailable: ${err.message}` });
        },
        timeout: 60000
    });
};

export const routes = (app: Application) => {
    // Add more debugging for incoming requests
    app.use((req, res, next) => {
        console.log(`API Gateway received: ${req.method} ${req.url}`);
        console.log(`Headers: ${JSON.stringify(req.headers, null, 2)}`);
        next();
    });

    app.options('*', (req, res) => {
        res.status(204).end();
    });

    app.get("/test-cors", (req: Request, res: Response) => {
        res.header("Access-Control-Allow-Origin", "https://v-learning-client-5r8j.vercel.app");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.status(200).json({status: "CORS test successful"});
    });

    app.get("/health", (req: Request, res: Response) => {
        res.status(200).json({ status: "api-gateway is running" });
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
    
    // Catch-all route handler
    app.use("*", (req: Request, res: Response) => {
        console.log(`404 Not Found: ${req.method} ${req.originalUrl}`);
        res.status(404).json({ error: "route not found" });
    });
};