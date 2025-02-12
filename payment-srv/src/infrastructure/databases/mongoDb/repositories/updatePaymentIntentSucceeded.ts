import { PaymentIntent } from "../../../../presentation/controllers/stripeWebhookController";
import { PaymentModel } from "../models";

export const updatePaymentIntentSucceeded = async (paymentIntentData:PaymentIntent) => {
    try {
        const { paymentIntentId, chargeId, checkoutSessionId, status, receiptUrl} = paymentIntentData;
        console.log(status,"status of the updatePaymentIntentSucceeded in REPO------");

        const updatedPayment = await PaymentModel.findOneAndUpdate(
            { paymentIntentId: paymentIntentId },
            {
                $set: {
                    chargeId: chargeId || "",
                    status: status,
                    receiptUrl: receiptUrl || "",
                    updatedAt: new Date(),
                },
            },
            { new: true }
        );
        console.log("✅ updatePaymentIntentSucceededuse REPO")
    } catch (error: any) {
        console.log("Error :-updatePaymentIntentSucceededRepo",error)
        throw new Error(error?.message || "updatePaymentIntentSucceededuseRepo Error")
    }
}