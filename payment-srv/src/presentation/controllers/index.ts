import { IDependencies } from "../../application/interfaces/IDependencies"
import { createSessionController } from "./createSessionController"
import { getPaymentHistoryController } from "./getPaymentHistoryController"
import { stripeWebhookController } from "./stripeWebhookController"



export const paymentController = (dependencies: IDependencies) =>  {
    return {
        createSession: createSessionController(dependencies),
        stripeWebhook: stripeWebhookController(dependencies),
        getPaymentHistory: getPaymentHistoryController(dependencies)
    }
}