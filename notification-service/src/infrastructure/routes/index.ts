import { controllers } from "../../presentation/controllers";
import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const notificationRoutes = (dependencies: IDependencies) => {
    const { sendVerificationMail } = controllers(dependencies)

    const router = Router();

    router.route("/email-verification").get(sendVerificationMail)
    
    return router;
}