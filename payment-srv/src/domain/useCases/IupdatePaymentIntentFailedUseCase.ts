import { PTobe } from "../../_lib/constants/Tobe";
import { PaymentFailureData } from "../../presentation/controllers/stripeWebhookController";

export interface IupdatePaymentIntentFailedUseCase {
    execute(failerData:PaymentFailureData) : Promise<PTobe>
}