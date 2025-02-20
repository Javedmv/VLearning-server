"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
        const _a = payload, { iat, exp } = _a, cleanPayload = __rest(_a, ["iat", "exp"]);
        return jsonwebtoken_1.default.sign(cleanPayload, secret, {
            expiresIn: "30d"
        });
    }
    catch (error) {
        throw new Error("failed to generate Refresh token");
    }
};
exports.generateRefreshToken = generateRefreshToken;
