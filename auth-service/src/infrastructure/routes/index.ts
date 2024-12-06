import { Request, Response, NextFunction, Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controllers } from "../../presentation/controllers";
import { jwtMiddleware } from "../../_lib/common";
import { uploadMiddleware } from '../../_lib/multer/multerConfig';
import { verifyAdmin,verifyUser } from "../../_lib/jwt";


export const routes = (dependencies: IDependencies) => {
    const {signup, findUserByEmail, resendOtp, login , getUser, postUserForm, logout , adminGetAllStudents,
         adminBlockUser, adminGetAllInstructors, adminVerifyInstructor} = controllers(dependencies);
    
    const router = Router();
    
    router.route("/signup").post(signup);
    router.route("/resend-otp").post(resendOtp)
    router.route("/find/:email").get(findUserByEmail);
    router.route("/login").post(login);
    router.route("/").get(jwtMiddleware, getUser);
    router.route("/logout").post(jwtMiddleware,logout)
    

    // user
    router.route("/multipart/user-form").post(
        uploadMiddleware,  // Use the wrapped middleware
        jwtMiddleware,
        verifyUser, 
        postUserForm
    );
    
    // admin
    router.route("/students").get(jwtMiddleware,verifyAdmin,adminGetAllStudents)
    router.route("/student/block/:id").put(jwtMiddleware,verifyAdmin,adminBlockUser)
    
    router.route("/instructors").get(jwtMiddleware,verifyAdmin, adminGetAllInstructors)
    router.route("/approve-decline/:id").put(jwtMiddleware,verifyAdmin, adminVerifyInstructor)


    return router;
}