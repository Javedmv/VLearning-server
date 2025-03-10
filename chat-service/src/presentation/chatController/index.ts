import { IDependencies } from "../../application/interfaces/IDependencies"

import {addNewMessageController} from "./addNewMessageController"
import { getAllInstructorChatsController } from "./getAllInstructorChatsController"
import { getAllMessagesController } from "./getAllMessagesController"
import { getExsistingChatController } from "./getExsistingChatController"
import { markAsSeenController } from "./markAsSeenControllor"

export const chatControllers = (dependencies: IDependencies) =>  {
    return {
        addNewMessage: addNewMessageController(dependencies),
        getExsistingChat: getExsistingChatController(dependencies),
        getAllMessages: getAllMessagesController(dependencies),
        markAsSeen: markAsSeenController(dependencies),
        getAllInstructorChats: getAllInstructorChatsController(dependencies)
    }
}