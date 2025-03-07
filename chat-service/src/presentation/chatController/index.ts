import { IDependencies } from "../../application/interfaces/IDependencies"

import {addNewMessageController} from "./addNewMessageController"
import { getExsistingChatController } from "./getExsistingChatController"

export const chatControllers = (dependencies: IDependencies) =>  {
    return {
        addNewMessage: addNewMessageController(dependencies),
        getExsistingChat: getExsistingChatController(dependencies)
    }
}