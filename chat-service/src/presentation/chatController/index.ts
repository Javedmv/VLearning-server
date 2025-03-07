import { IDependencies } from "../../application/interfaces/IDependencies"

import {addNewMessageController} from "./addNewMessageController"
import { getAllMessagesController } from "./getAllMessagesController"
import { getExsistingChatController } from "./getExsistingChatController"

export const chatControllers = (dependencies: IDependencies) =>  {
    return {
        addNewMessage: addNewMessageController(dependencies),
        getExsistingChat: getExsistingChatController(dependencies),
        getAllMessages: getAllMessagesController(dependencies)
    }
}