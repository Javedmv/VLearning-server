import { IDependencies } from "../../application/interfaces/IDependencies";
import { findByEmailContorller } from "./findByEmailController";
import { loginController } from "./login";
import { resendOtpController } from "./resendOtp";
import { signupController } from "./signup";
import { getUserController } from "./getUserController";
import { postUserFormController} from "./postUserFormController"
import { logoutController } from "./logoutController";
import { adminGetAllStudentsController } from "./adminGetAllStudentsController";
import { adminBlockUserController } from './adminBlockUserController';
import { adminGetAllInstructorsController } from "./adminGetAllInstructors";
import { adminVerifyInstructorController } from "./adminVerifyInstructorController";
import { forgotPasswordController } from "./forgotPasswordController";
import { forgotPasswordSubmitController } from "./forgotPasswordSubmitController";
import { updateForgotPasswordController } from "./updateForgotPasswordController";
import { adminGetProfileController } from "./adminGetProfileController";
import { adminUpdatePasswordController } from "./adminUpdatePasswordController";
import { getUserDetailsController } from "./getUserDetailsController";
import { updateUserProfileController } from "./updateUserProfileController";
import { updatePasswordController } from "./updatePasswordController";
import { postApplyTeachController } from "./postApplyTeachController";
import { postInstructorReapplyController } from "./postInstructorReapplyController";
import { addBannerController } from "./addBannerController";
import { getAllBannerController } from "./getAllBannerController";
import { deleteBannerController } from "./deleteBannerController";
import { toggleBannerStatusController } from "./toggleBannerStatusController";
import { getAllActiveBannerController } from "./getAllActiveBannerController";

export const controllers = (dependencies: IDependencies) =>  {
    return {
        signup: signupController(dependencies),
        findUserByEmail: findByEmailContorller(dependencies),
        resendOtp: resendOtpController(dependencies),
        login: loginController(dependencies),
        getUser: getUserController(dependencies),
        postUserForm: postUserFormController(dependencies),
        logout: logoutController(dependencies),
        forgotPassword: forgotPasswordController(dependencies),
        forgotPasswordSubmit: forgotPasswordSubmitController(dependencies),
        updateForgotPassword: updateForgotPasswordController(dependencies),
        
        getUserDetails: getUserDetailsController(dependencies),
        updateUserProfile: updateUserProfileController(dependencies),
        updatePassword: updatePasswordController(dependencies),
        postApplyTeach: postApplyTeachController(dependencies),
        postInstructorReapply: postInstructorReapplyController(dependencies),

        adminGetAllStudents: adminGetAllStudentsController(dependencies),
        adminBlockUser: adminBlockUserController(dependencies),
        adminGetAllInstructors: adminGetAllInstructorsController(dependencies),
        adminVerifyInstructor: adminVerifyInstructorController(dependencies),
        adminGetProfile: adminGetProfileController(dependencies),
        adminUpdatePassword: adminUpdatePasswordController(dependencies),

        addBanner: addBannerController(dependencies),
        getAllBanner: getAllBannerController(dependencies),
        deleteBanner: deleteBannerController(dependencies),
        toggleBannerStatus: toggleBannerStatusController(dependencies),
        getAllActiveBanner: getAllActiveBannerController(dependencies),
    }
}