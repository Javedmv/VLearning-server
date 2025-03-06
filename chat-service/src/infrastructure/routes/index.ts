import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { chatControllers } from "../../presentation/chatController";
import { jwtMiddleware } from '../../_lib/middlewares/jwtMiddleware';

export const routes = (dependencies: IDependencies) => {

    const { addNewMessage } = chatControllers(dependencies);
    
    const router = Router();

    router.route("/message").post(jwtMiddleware, addNewMessage);

    return router;
}