import { IDependencies } from "../../application/interfaces/IDependencies"

import {addNewMessageController} from "./addNewMessageController"
import { getAdminDashboardController } from "./getAdminDashboardController"
import { getAllInstructorChatsController } from "./getAllInstructorChatsController"
import { getAllMessagesController } from "./getAllMessagesController"
import { getExsistingChatController } from "./getExsistingChatController"
import { markAsSeenController } from "./markAsSeenControllor"
import { startStreamController } from "./startStreamController"
import { getStreamDetailsController } from "./getStreamDetailsController"
import { stopStreamController } from "./stopStreamController"
import { getChatStatusController } from "./getChatStatusController"
export const chatControllers = (dependencies: IDependencies) =>  {
    return {
        addNewMessage: addNewMessageController(dependencies),
        getExsistingChat: getExsistingChatController(dependencies),
        getAllMessages: getAllMessagesController(dependencies),
        markAsSeen: markAsSeenController(dependencies),
        getAllInstructorChats: getAllInstructorChatsController(dependencies),
        getAdminDashboard: getAdminDashboardController(dependencies),
        startStream: startStreamController(dependencies),
        getStreamDetails: getStreamDetailsController(dependencies),
        stopStream: stopStreamController(dependencies),
        getChatStatus: getChatStatusController(dependencies)
    }
}