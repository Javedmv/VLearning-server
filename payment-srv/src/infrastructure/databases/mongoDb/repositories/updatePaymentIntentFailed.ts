import { PaymentFailureData } from "../../../../presentation/controllers/stripeWebhookController";
import { PaymentModel } from "../models";

export const updatePaymentIntentFailed = async (failureData: PaymentFailureData) => {
    try {
        const { paymentIntentId, status, errorMessage, failureCode } = failureData;

        const updatedPayment = await PaymentModel.findOneAndUpdate(
            { paymentIntentId: paymentIntentId },
            {
                $set: {
                    status,
                    errorMessage: errorMessage || "Unknown error",
                    failureCode: failureCode || "Unknown failure code",
                    updatedAt: new Date(),
                },
            },
            { new: true }
        );

        if (!updatedPayment) {
            console.log("Payment intent not found:", paymentIntentId);
        } else {
            console.log("✅ Payment failure updated successfully");
        }

        return updatedPayment;
    } catch (error: any) {
        console.error("❌ Error updating failed payment intent:", error);
        throw new Error(error?.message || "updatePaymentIntentFailed REPO Error");
    }
};
