import { IDependencies } from "../../application/interfaces/IDependencies";
import { findByEmailContorller } from "./findByEmailController";
import { loginController } from "./login";
import { resendOtpController } from "./resendOtp";
import { signupController } from "./signup";
import { getUserController } from "./getUserController";
import { postUserFormController} from "./postUserFormController"

export const controllers = (dependencies: IDependencies) =>  {
    return {
        signup: signupController(dependencies),
        findUserByEmail: findByEmailContorller(dependencies),
        resendOtp: resendOtpController(dependencies),
        login: loginController(dependencies),
        getUser: getUserController(dependencies),
        postUserForm: postUserFormController(dependencies)
    }
}