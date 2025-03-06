import { IDependencies } from "../../application/interfaces/IDependencies"

import {addNewMessageController} from "./addNewMessageController"

export const chatControllers = (dependencies: IDependencies) =>  {
    return {
        addNewMessage: addNewMessageController(dependencies)
    }
}