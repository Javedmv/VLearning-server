import { PaymentFailureData } from "../../presentation/controllers/stripeWebhookController";

export interface IupdatePaymentIntentFailedUseCase {
    execute(failerData:PaymentFailureData) : Promise<any>
}