import { PaymentIntent } from "../../presentation/controllers/stripeWebhookController";

export interface IupdatePaymentIntentSucceededUseCase {
    execute(paymentIntentData:PaymentIntent): Promise<void>;
}