import { PaymentData } from "../../presentation/controllers/stripeWebhookController";

export interface ISavePaymentDBUseCase {
    execute(courseId:string,userId:string, paymentData:PaymentData) : Promise<any>
}