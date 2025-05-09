import mongoose, { Schema, Document } from "mongoose";
import { IPayment } from "../../../../domain/entities/PaymentEntity";

const PaymentSchema = new Schema<IPayment & Document>(
    {
        paymentIntentId: { type: String, required: true, unique: true },
        chargeId: { type: String, default: "" }, // Updated when charge.succeeded
        checkoutSessionId: { type: String, required: true },
        userId: { type: String, required: true, index: true, ref: "users" },
        courseId: { type: String, required: true, index: true, ref: "Courses" },
        instructorId: { type: String, required: true },
        amount: { type: Number, required: true },
        instructorEarnings: { type: Number },
        adminEarnings: { type: Number },
        currency: { type: String, required: true, default: "inr" },
        status: { type: String, required: true, enum: ["succeeded", "complete", "failed"] },
        customerEmail: { type: String },
        receiptUrl: { type: String, default: "" },
        errorMessage: { type: String, default: null }, // Stores error message in case of failure
        failureCode: { type: String, default: null }, // Stores Stripe failure code if
        metadata: { type: Schema.Types.Mixed },
    },
    { timestamps: true }
);

export const PaymentModel = mongoose.model<IPayment>("payments", PaymentSchema);
