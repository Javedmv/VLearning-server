import { IDependencies } from "../../application/interfaces/IDependencies"
import { createSessionController } from "./createSessionController"



export const paymentController = (dependencies: IDependencies) =>  {
    return {
        createSession: createSessionController(dependencies),
    }
}