import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { chatControllers } from "../../presentation/chatController";
import { jwtMiddleware } from '../../_lib/middlewares/jwtMiddleware';
import { verifyAdmin } from "../../_lib/jwt";

export const routes = (dependencies: IDependencies) => {

    const { 
        addNewMessage,
        getExsistingChat, 
        getAllMessages, 
        markAsSeen, 
        getAllInstructorChats, 
        getAdminDashboard,
        startStream,
        getStreamDetails,
        stopStream,
        getChatStatus
    } = chatControllers(dependencies);
     
    const router = Router();

    router.route("/message").post(jwtMiddleware, addNewMessage);
    router.route("/get-chat").get(jwtMiddleware, getExsistingChat)
    router.route("/messages/:chatId").get(jwtMiddleware, getAllMessages);
    router.route("/mark-seen").put(jwtMiddleware, markAsSeen);
    router.route("/instructor-chats").get(jwtMiddleware, getAllInstructorChats);

    router.route("/streaming/start").post(jwtMiddleware, startStream);
    router.route("/streaming/details/:chatId").get(jwtMiddleware, getStreamDetails);
    router.route("/streaming/stop/:chatId").post(jwtMiddleware, stopStream);
    router.route("/chats/:chatId/status").get(jwtMiddleware, getChatStatus);

    router.route("/admin-dashboard").get(jwtMiddleware,verifyAdmin, getAdminDashboard);
    return router;
}