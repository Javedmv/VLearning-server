import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { chatControllers } from "../../presentation/chatController";
import { jwtMiddleware } from '../../_lib/middlewares/jwtMiddleware';
import { verifyAdmin } from "../../_lib/jwt";

export const routes = (dependencies: IDependencies) => {

    const { addNewMessage,getExsistingChat, getAllMessages, markAsSeen, getAllInstructorChats, getAdminDashboard } = chatControllers(dependencies);
     
    const router = Router();

    router.route("/message").post(jwtMiddleware, addNewMessage);
    router.route("/get-chat").get(jwtMiddleware, getExsistingChat)
    router.route("/messages/:chatId").get(jwtMiddleware, getAllMessages);
    router.route("/mark-seen").put(jwtMiddleware, markAsSeen);
    router.route("/instructor-chats").get(jwtMiddleware, getAllInstructorChats);

    router.route("/admin-dashboard").get(jwtMiddleware,verifyAdmin, getAdminDashboard);
    return router;
}