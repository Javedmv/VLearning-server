import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controllers } from "../../presentation/controllers";
import { jwtMiddleware } from "../../_lib/common";
import { uploadMiddleware } from '../../_lib/multer/multerConfig';
import { verifyAdmin,verifyUser } from "../../_lib/jwt";


export const routes = (dependencies: IDependencies) => {
    const {signup, findUserByEmail, resendOtp, login , getUser, postUserForm, logout , adminGetAllStudents,
         adminBlockUser, adminGetAllInstructors, adminVerifyInstructor, forgotPassword ,forgotPasswordSubmit,
         updateForgotPassword, adminGetProfile, adminUpdatePassword, getUserDetails, updateUserProfile, updatePassword,
         postApplyTeach ,postInstructorReapply, addBanner, getAllBanner ,deleteBanner} = controllers(dependencies);
    
    const router = Router();
    
    router.route("/signup").post(signup);
    router.route("/resend-otp").post(resendOtp)
    router.route("/find/:email").get(findUserByEmail);
    router.route("/login").post(login);
    router.route("/").get(jwtMiddleware, getUser);
    router.route("/logout").post(jwtMiddleware,logout);
    router.route("/forgot-password").post(forgotPassword);
    router.route("/forgot-password/otp-submit").post(forgotPasswordSubmit);
    router.route("/forgot-password/update-passoword").post(updateForgotPassword);

    // user
    router.route("/multipart/user-form").post(
        uploadMiddleware,  // Use the wrapped middleware
        jwtMiddleware,
        verifyUser, 
        postUserForm
    );
    router.route("/profile/:id").get(jwtMiddleware,verifyUser,getUserDetails)
    .post(jwtMiddleware,verifyUser,updateUserProfile);
    router.route("/update/password").post(jwtMiddleware, verifyUser, updatePassword);

    router.route("/multipart/apply-teach").post(uploadMiddleware,jwtMiddleware,verifyUser,postApplyTeach);
    router.route("/multipart/instructor-reapply").post(uploadMiddleware,jwtMiddleware,verifyUser,postInstructorReapply);
    
    // admin
    router.route("/admin-profile").get(jwtMiddleware,verifyAdmin, adminGetProfile);
    router.route("/update-password").post(jwtMiddleware,verifyAdmin, adminUpdatePassword);

    router.route("/students").get(jwtMiddleware,verifyAdmin,adminGetAllStudents);
    router.route("/student/block/:id").put(jwtMiddleware,verifyAdmin,adminBlockUser);
    
    router.route("/instructors").get(jwtMiddleware,verifyAdmin, adminGetAllInstructors);
    router.route("/approve-decline/:id").put(jwtMiddleware,verifyAdmin, adminVerifyInstructor);

    // Banner
    router.route("/multipart/add-banner").post(uploadMiddleware,jwtMiddleware,verifyAdmin, addBanner);
    router.route("/all-banner").get(jwtMiddleware,verifyAdmin, getAllBanner);
    router.route("/delete-banner/:id").delete(jwtMiddleware,verifyAdmin, deleteBanner);


    return router;
}