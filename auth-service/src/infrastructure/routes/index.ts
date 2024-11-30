import { Request, Response, NextFunction, Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controllers } from "../../presentation/controllers";
import { jwtMiddleware } from "../../_lib/common";
import { verifyStudentUser } from "../../_lib/jwt/verifyUser";
// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, '../../uploads/')); // Define the directory where files will be stored
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname); // Define the filename pattern
//     }
// })

// const upload = multer({storage,fileFilter: (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword'];
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type'));
//     }
//   },
//   limits: {
//     fileSize: 10 * 1024 * 1024 // 10MB file size limit
//   }})

export const routes = (dependencies: IDependencies) => {
    const {signup, findUserByEmail, resendOtp, login , getUser, postUserForm} = controllers(dependencies);
    
    const router = Router();
    
    router.route("/signup").post(signup);
    router.route("/resend-otp").post(resendOtp)
    router.route("/find/:email").get(findUserByEmail);
    router.route("/login").post(login);
    router.route("/").get(jwtMiddleware, getUser);
    
    router.route("/user-form").post(jwtMiddleware,verifyStudentUser, postUserForm);

    return router;
}