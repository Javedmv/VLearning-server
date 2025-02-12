import { PaymentFailureData } from "../../presentation/controllers/stripeWebhookController";
import { IDependencies } from "../interfaces/IDependencies";

export const updatePaymentIntentFailedUseCase = (dependencies:IDependencies) => {
    const {repositories: {updatePaymentIntentFailed} } = dependencies;
    return {
        execute: async (failureData:PaymentFailureData) => {
            try {
                return await updatePaymentIntentFailed(failureData);
            } catch (error) {
                console.log("ERROR in updatePaymentIntentFailedUseCase",error);
            }
        }
    }
}