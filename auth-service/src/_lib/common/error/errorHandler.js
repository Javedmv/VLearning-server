"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorResponse_1 = __importDefault(require("./errorResponse"));
const errorHandler = (err, req, res, next) => {
    console.log("yes error handler is executed", err);
    if (err instanceof errorResponse_1.default) {
        res.status(err.status).json({
            success: false,
            status: err.status,
            message: err.message
        });
        return;
    }
    res.status(400).json({
        success: false,
        status: (err === null || err === void 0 ? void 0 : err.status) || 400,
        message: "Internal Server Error",
    });
    return;
};
exports.default = errorHandler;
