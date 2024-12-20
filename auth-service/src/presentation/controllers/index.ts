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
        adminGetAllStudents: adminGetAllStudentsController(dependencies),
        adminBlockUser: adminBlockUserController(dependencies),
        adminGetAllInstructors: adminGetAllInstructorsController(dependencies),
        adminVerifyInstructor: adminVerifyInstructorController(dependencies),
    }
}