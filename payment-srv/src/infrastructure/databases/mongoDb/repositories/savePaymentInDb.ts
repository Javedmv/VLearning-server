import { PaymentData } from "../../../../presentation/controllers/stripeWebhookController";
import { PaymentModel } from "../models";

export const savePaymentInDb = async (
    courseId: string,
    userId: string,
    paymentData: PaymentData
): Promise<any> => {
    try {
        console.log(courseId, userId, paymentData);
        console.log("📌 Hello from the repo of the create payment session");

        // Creating a new payment record
        const newPayment = new PaymentModel({
            paymentIntentId: paymentData.paymentIntentId,
            chargeId: paymentData.chargeId || "", // Will update later when charge.succeeded event is received
            checkoutSessionId: paymentData.checkoutSessionId,
            userId,
            courseId,
            instructorId: paymentData.metadata?.instructorId || "",
            amount: paymentData.amount,
            currency: paymentData.currency || "inr",
            status: paymentData.status,
            customerEmail: paymentData.customerEmail,
            metadata: paymentData.metadata,
        });

        // Saving the payment record in the database
        const savedPayment = await newPayment.save();
        console.log("✅ Payment saved successfully:", savedPayment);

        return savedPayment;
    } catch (error: any) {
        console.error("❌ Error saving payment:", error.message);
        throw new Error("Error saving payment to database");
    }
};
