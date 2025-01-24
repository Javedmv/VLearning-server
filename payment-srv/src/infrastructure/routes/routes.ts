
import { verifyAdmin, verifyUser } from "../../_lib/jwt";
import { jwtMiddleware } from "../../_lib/middlewares/jwtMiddleware";
import {IDependencies} from "../../application/interfaces/IDependencies"
import { Router } from "express"
import { paymentController } from "../../presentation/controllers";


export const routes = (dependencies:IDependencies) => {
    const {createSession} = paymentController(dependencies)

    const router = Router();

    router.route("/create-session").post(createSession)


    return router;
}