import { Application, Request, Response } from "express";
import proxy from "express-http-proxy";
import { Service } from "./config";

// Helper function for multipart/form-data routes
const createMultipartProxy = (serviceUrl: string) => {
    return proxy(serviceUrl, {
        proxyReqPathResolver(req) {
            console.log("Creating multipart proxy for", req.url);
            return "/multipart" + req.url
        },
        parseReqBody: false,
        reqBodyEncoding: null
    })
}

// const createWebhookProxy = (serviceUrl: string) => {
//     return proxy(serviceUrl, {
//         proxyReqPathResolver(req) {
//             return '/webhook';
//         },
//         proxyReqBodyDecorator: (bodyContent, srcReq) => {
//             // Pass through raw body for webhooks
//             return bodyContent;
//         },
//         parseReqBody: false, // Don't parse the body
//         reqBodyEncoding: null, // Keep raw buffer
//         proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
//             proxyReqOpts.headers = {
//                 ...srcReq.headers,
//                 'content-type': 'application/json',
//             };
//             return proxyReqOpts;
//         }
//     });
// };

// Helper function for regular JSON/urlencoded routes


const createRegularProxy = (serviceUrl: string) => {
    return proxy(serviceUrl, {
        proxyReqPathResolver(req) {
            return req.url
        },
        timeout:60000
    })
}

export const routes = (app: Application) => {
    app.get("/health", (req:Request, res:Response) => {
        res.status(200).json({status: "api-gateway is running"})
    })

    // Use multipart proxy only for file upload routes
    app.use("/auth/multipart", createMultipartProxy(Service.AUTH_SERVICE_URL))
    // Use regular proxy for other auth routes
    app.use("/auth", createRegularProxy(Service.AUTH_SERVICE_URL))

    app.use("/notification", createRegularProxy(Service.NOTIFICATION_SERVICE_URL))

    // Use multipart proxy only for file upload routes
    app.use("/course/multipart", createMultipartProxy(Service.COURSE_SERVICE_URL))

    // Use regular proxy for other course routes
    app.use("/course", createRegularProxy(Service.COURSE_SERVICE_URL))

    // Use multipart proxy only for file upload routes
    // app.use("/payment/webhook", createWebhookProxy(Service.PAYMENT_SERVICE_URL))

    app.use("/payment", createRegularProxy(Service.PAYMENT_SERVICE_URL))

    app.use("/chat", createRegularProxy(Service.CHAT_SERVICE_URL))
    
    app.use("*",(req:Request, res:Response) => {
        res.status(404).json({error: "route not found"})
    })
}