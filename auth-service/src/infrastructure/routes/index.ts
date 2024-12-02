import { Request, Response, NextFunction, Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controllers } from "../../presentation/controllers";
import { jwtMiddleware } from "../../_lib/common";
import { verifyUser } from "../../_lib/jwt/verifyUser";
import { uploadMiddleware } from '../../_lib/multer/multerConfig';


export const routes = (dependencies: IDependencies) => {
    const {signup, findUserByEmail, resendOtp, login , getUser, postUserForm} = controllers(dependencies);
    
    const router = Router();
    
    router.route("/signup").post(signup);
    router.route("/resend-otp").post(resendOtp)
    router.route("/find/:email").get(findUserByEmail);
    router.route("/login").post(login);
    router.route("/").get(jwtMiddleware, getUser);
    
    router.route("/multipart/user-form").post(
        uploadMiddleware,  // Use the wrapped middleware
        jwtMiddleware,
        verifyUser, 
        postUserForm
    );

    return router;
}