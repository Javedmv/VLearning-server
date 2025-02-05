
import { verifyAdmin, verifyUser } from "../../_lib/jwt";
import { jwtMiddleware } from "../../_lib/middlewares/jwtMiddleware";
import {IDependencies} from "../../application/interfaces/IDependencies"
import express,{ Router } from "express"
import { paymentController } from "../../presentation/controllers";


export const routes = (dependencies:IDependencies) => {
    const {createSession ,stripeWebhook} = paymentController(dependencies)

    const router = Router();

    router.route("/webhook").post(
        express.raw({ type: "application/json" }), // Ensures raw body is parsed
        stripeWebhook
      );
    router.route("/create-session").post(createSession);

    return router;
}