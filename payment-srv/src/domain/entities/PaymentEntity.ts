import { Document } from "mongoose";

export interface IPayment extends Document {
    paymentIntentId: string;
    chargeId?: string;
    checkoutSessionId: string;
    userId: string;
    courseId: string;
    instructorId: string;
    amount: number;
    currency: string;
    status: string;
    customerEmail?: string;
    metadata?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}