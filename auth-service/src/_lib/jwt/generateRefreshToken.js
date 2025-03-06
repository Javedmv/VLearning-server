"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateRefreshToken = (payload) => {
    try {
        const secret = process.env.JWT_REFRESH_TOKEN_SECRET;
        if (!secret) {
            throw new Error("jwt secret not found");
        }
        return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: "30d" });
    }
    catch (error) {
        throw new Error("failed to generate Refresh token");
    }
};
exports.generateRefreshToken = generateRefreshToken;
