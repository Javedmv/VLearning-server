import { Document } from "mongoose";

export interface IPayment extends Document {
    paymentIntentId: string;
    chargeId: string; // Always present after charge.succeeded
    checkoutSessionId: string;
    userId: string;
    courseId: string;
    instructorId: string;
    amount: number;
    instructorEarnings?: number;
    adminEarnings?: number;
    currency: string;
    status: "succeeded" | "complete" | "failed"; // Enforcing strict types
    receiptUrl: string;
    customerEmail?: string;
    errorMessage?: string; 
    failureCode?: string; 
    metadata?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
