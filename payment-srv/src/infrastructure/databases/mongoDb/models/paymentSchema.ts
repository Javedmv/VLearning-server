import mongoose, { Schema } from "mongoose";
import { IPayment } from "../../../../domain/entities/PaymentEntity";


const PaymentSchema = new Schema<IPayment>(
    {
        paymentIntentId: { type: String, required: true },
        chargeId: { type: String, default: "" }, // Will update later in charge.succeeded event
        checkoutSessionId: { type: String, required: true },
        userId: { type: String, required: true, index: true },
        courseId: { type: String, required: true, index: true },
        instructorId: { type: String, required: true },
        amount: { type: Number, required: true },
        currency: { type: String, required: true, default: "inr" },
        status: { type: String, required: true, enum: ["completed", "pending", "failed"] },
        customerEmail: { type: String },
        metadata: { type: Schema.Types.Mixed },
    },
    { timestamps: true }
);

export const PaymentModel = mongoose.model<IPayment>("payments", PaymentSchema);