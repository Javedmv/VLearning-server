import { PaymentIntent } from "../../presentation/controllers/stripeWebhookController";
import { IDependencies } from "../interfaces/IDependencies";

export const updatePaymentIntentSucceededUseCase = (dependencies:IDependencies) => {
    const {repositories: { updatePaymentIntentSucceeded }} = dependencies;
    return {
        execute: async (paymentIntentData:PaymentIntent) => {
            try {
                await updatePaymentIntentSucceeded(paymentIntentData)
            } catch (error:any) {
                console.log("Error :- updatePaymentIntentSucceededuseCase",error)
                throw new Error(error?.message || "updatePaymentIntentSucceededuseCase Error")
            }
        }
    }
};