
import { verifyAdmin, verifyUser } from "../../_lib/jwt";
import { jwtMiddleware } from "../../_lib/middlewares/jwtMiddleware";
import {IDependencies} from "../../application/interfaces/IDependencies"
import express,{ Router } from "express"
import { paymentController } from "../../presentation/controllers";


export const routes = (dependencies:IDependencies) => {
    const {createSession ,stripeWebhook, getPaymentHistory, getInstructorEarnings} = paymentController(dependencies)

    const router = Router();

    router.route("/history").get(jwtMiddleware,getPaymentHistory)
    router.route("/webhook").post(
        express.raw({ type: "application/json" }), // Ensures raw body is parsed
        stripeWebhook
      );
    router.route("/create-session").post(createSession);
    router.route("/earnings").get(jwtMiddleware, getInstructorEarnings);

    return router;
}