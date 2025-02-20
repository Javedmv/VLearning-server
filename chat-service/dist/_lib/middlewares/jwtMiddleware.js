"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../jwt");
const jwtMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { access_token, refresh_token } = req.cookies;
        if (!access_token && !refresh_token) {
            return next();
        }
        let user = null;
        if (access_token) {
            try {
                user = jsonwebtoken_1.default.verify(access_token, process.env.JWT_ACCESS_TOKEN_SECRET);
            }
            catch (error) {
                console.log("Access token verification failed, trying refresh token");
            }
        }
        if (!user && refresh_token) {
            try {
                const refreshUser = jsonwebtoken_1.default.verify(refresh_token, process.env.JWT_REFRESH_TOKEN_SECRET);
                if (refreshUser) {
                    const cleanPayload = {
                        _id: refreshUser._id,
                        email: refreshUser.email,
                        role: refreshUser.role
                    };
                    const newAccessToken = (0, jwt_1.generateAccessToken)(cleanPayload);
                    res.cookie("access_token", newAccessToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                    });
                    user = cleanPayload;
                }
            }
            catch (error) {
                console.error("Refresh token verification failed:", error);
            }
        }
        if (!user) {
            res.clearCookie("access_token");
            res.clearCookie("refresh_token");
            return next();
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error("Error in JWT middleware:", error);
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        next(error);
    }
});
exports.jwtMiddleware = jwtMiddleware;
