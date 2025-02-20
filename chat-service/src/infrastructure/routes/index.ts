import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { chatControllers } from "../../presentation/chatController";

export const routes = (dependencies: IDependencies) => {

    const { } = chatControllers(dependencies);
    
    const router = Router();


    return router;
}