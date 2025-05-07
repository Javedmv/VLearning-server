import { Request, Response } from "express";

export const redirectDebugMiddleware = (req: Request, res: Response, next: Function) => {
  // Only process this middleware for the debug route
  if (req.path !== '/debug/redirect-check') {
    return next();
  }

  const requestInfo = {
    method: req.method,
    url: req.url,
    originalUrl: req.originalUrl,
    path: req.path,
    protocol: req.protocol,
    secure: req.secure,
    hostname: req.hostname,
    ip: req.ip,
    headers: req.headers,
    cookies: req.cookies,
    query: req.query,
  };

  // Clean up sensitive information
  if (requestInfo.headers.authorization) {
    requestInfo.headers.authorization = '[REDACTED]';
  }
  if (requestInfo.headers.cookie) {
    requestInfo.headers.cookie = '[REDACTED]';
  }

  res.status(200).json({
    message: "Redirect debugging information",
    requestInfo,
    serverInfo: {
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      env: {
        NODE_ENV: process.env.NODE_ENV,
      }
    }
  });
};