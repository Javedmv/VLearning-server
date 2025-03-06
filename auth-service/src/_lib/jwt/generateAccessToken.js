"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (payload) => {
    try {
        const secret = process.env.JWT_ACCESS_TOKEN_SECRET;
        if (!secret) {
            throw new Error("Access token not defined");
        }
        // const {_id,email,role} = payload;
        return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: "24h" });
    }
    catch (error) {
        throw new Error("Failed to generate access token.");
    }
};
exports.generateAccessToken = generateAccessToken;
