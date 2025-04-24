import { PaymentIntent } from "../../presentation/controllers/stripeWebhookController";
import { IDependencies } from "../interfaces/IDependencies";

export const updatePaymentIntentSucceededUseCase = (dependencies:IDependencies) => {
    const {repositories: { updatePaymentIntentSucceeded }} = dependencies;
    return {
        execute: async (paymentIntentData:PaymentIntent) => {
            try {
                await updatePaymentIntentSucceeded(paymentIntentData)
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.log("Error :- updatePaymentIntentSucceededuseCase", error);
                    throw new Error(error.message || "updatePaymentIntentSucceededuseCase Error");
                } else {
                    console.log("Error :- updatePaymentIntentSucceededuseCase: Unknown error");
                    throw new Error("updatePaymentIntentSucceededuseCase Error: Unknown error occurred");
                }
            }
            
        }
    }
};