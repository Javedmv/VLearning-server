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
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("❌ Error updating failed payment intent:", error.message);
        } else {
            console.error("❌ Unknown error occurred while updating failed payment intent.");
        }
        throw new Error(error instanceof Error ? error.message : "updatePaymentIntentFailed REPO Error");
    }
    
};
