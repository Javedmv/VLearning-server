import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { chatControllers } from "../../presentation/chatController";
import { jwtMiddleware } from '../../_lib/middlewares/jwtMiddleware';

export const routes = (dependencies: IDependencies) => {

    const { addNewMessage,getExsistingChat, getAllMessages, markAsSeen, getAllInstructorChats } = chatControllers(dependencies);
     
    const router = Router();

    router.route("/message").post(jwtMiddleware, addNewMessage);
    router.route("/get-chat").get(jwtMiddleware, getExsistingChat)
    router.route("/messages/:chatId").get(jwtMiddleware, getAllMessages);
    router.route("/mark-seen").put(jwtMiddleware, markAsSeen);
    router.route("/instructor-chats").get(jwtMiddleware, getAllInstructorChats);

    return router;
}