import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { config } from "dotenv";
import Stripe from "stripe";
import { savePaymentDBUseCase } from '../../application/useCases/savePaymentDBUseCase';

config();

const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY!);

export interface PaymentData {
    paymentIntentId: string;
    chargeId: string;
    checkoutSessionId: string; // Added checkout session ID
    amount: number;
    currency: string;
    status: string;
    customerEmail?: string;
    metadata?: any;
}

export interface PaymentIntent {
    paymentIntentId: string;
    chargeId: string;
    checkoutSessionId: string;
    status: string;
    receiptUrl: string;
}

export interface PaymentFailureData {
    paymentIntentId: string;
    courseId: string;
    userId: string;
    instructorId: string;
    status: "failed";
    errorMessage?: string;
    failureCode?: string;
}

  


export const stripeWebhookController = (dependencies: IDependencies) => {
    const { useCases: { savePaymentDBUseCase, enrollStudentInCourseUseCase, updatePaymentIntentSucceededUseCase, updatePaymentIntentFailedUseCase } } = dependencies;

    const handleCheckoutSessionCompleted = async (session: Stripe.Checkout.Session) => {
        console.log("Processing checkout.session.completed",session);
        try {
            // Extract relevant data
            const courseId = session.metadata?.courseId!;
            const userId = session.metadata?.userId!;
            const instructorId = session.metadata?.instructorId!;
            const checkoutSessionId = session.id!;

            const paymentData: PaymentData = {
                paymentIntentId: session.payment_intent as string,
                chargeId: '', // Will update later in charge.succeeded event
                checkoutSessionId,
                amount: session.amount_total || 0,
                currency: session.currency || 'inr',
                status: session.status || 'succeeded',
                customerEmail: session.customer_email!,
                metadata: session.metadata
            };
    
            await savePaymentDBUseCase(dependencies).execute(courseId, userId, paymentData);
    
            await enrollStudentInCourseUseCase(dependencies).execute(userId, courseId);
    
            console.log("✅ Send Confirmation Email (Optional)");
            // await sendPaymentConfirmationEmail(userId, courseId, session.customer_email!);
    
            console.log('✅ Checkout session completed successfully:', session.id);
            // Corrected: Return success response instead of res.json

            return { success: true, paymentData };
    
        } catch (error:any) {
            console.error('❌ Error processing checkout session:', error);
            return { success: false, error: error.message };
        }
    };
    

    const handlePaymentIntentSucceeded = async (paymentIntent: Stripe.PaymentIntent) => {
        console.log("Processing payment_intent.succeeded");
        try {
            const courseId = paymentIntent.metadata?.courseId!;
            const userId = paymentIntent.metadata?.userId!;
            const instructorId = paymentIntent.metadata?.instructorId!;
            const checkoutSessionId = paymentIntent.metadata?.checkoutSessionId!;
    
            // Fetch charge details using the payment intent
            const charges = await stripe.charges.list({ payment_intent: paymentIntent.id });
            const charge = charges.data.length > 0 ? charges.data[0] : null;
            const chargeId = charge ? charge.id : "";
            console.log(paymentIntent,"handle charge.Succeded-------------------------------------------4")
    
            // Store relevant payment data
            const paymentData:PaymentIntent = {
                paymentIntentId: paymentIntent.id,
                chargeId, 
                checkoutSessionId, // Retrieved from metadata
                status: paymentIntent.status,
                receiptUrl: charge?.receipt_url || "",
                // amount: paymentIntent.amount,
                // currency: paymentIntent.currency,
                // metadata: paymentIntent.metadata
            };
    
            await updatePaymentIntentSucceededUseCase(dependencies).execute(paymentData)
            // Add your logic here to update payment status in the database
            console.log('Payment intent succeeded:', paymentIntent.id);
            return paymentData;
        } catch (error) {
            console.error('Error processing payment intent:', error);
            throw error;
        }
    };
    

    const handlePaymentIntentCreated = async (paymentIntent: Stripe.PaymentIntent) => {
        console.log("Processing payment_intent.created----3");
        try {
            
            const courseId = paymentIntent.metadata?.courseId!;
            const userId = paymentIntent.metadata?.userId!;
            const instructorId = paymentIntent.metadata?.instructorId!;
            
            // Log or store initial payment intent
            const paymentData = {
                paymentIntentId: paymentIntent.id,
                status: 'created',
                amount: paymentIntent.amount,
                currency: paymentIntent.currency,
                metadata: paymentIntent.metadata
            };

            // Add your logic here to store initial payment intent
            console.log('Payment intent created:', paymentIntent.id);
            return paymentData;
        } catch (error) {
            console.error('Error processing payment intent creation:', error);
            throw error;
        }
    };

    const handleChargeSucceeded = async (charge: Stripe.Charge) => {
        console.log("Processing charge.succeeded");
        try {
            const courseId = charge.metadata?.courseId
            const userId = charge.metadata?.userId
            const instructorId = charge.metadata?.instructorId
            console.log(charge,"handle charge.Succeded-----------------------------------------------1")

            // Store charge details
            const chargeData = {
                chargeId: charge.id,
                paymentIntentId: charge.payment_intent as string,
                amount: charge.amount,
                currency: charge.currency,
                status: charge.status,
                receiptUrl: charge.receipt_url
            };

            // Add your logic here to store charge details
            console.log('Charge succeeded:', charge.id);
            return chargeData;
        } catch (error) {
            console.error('Error processing charge:', error);
            throw error;
        }
    };

    const handleChargeUpdated = async (charge: Stripe.Charge) => {
        console.log("Processing charge.updated");
        try {
            console.log(charge, "charge.updated------------------------------------------------5")

            const courseId = charge.metadata?.courseId
            const userId = charge.metadata?.userId
            const instructorId = charge.metadata?.instructorId
            // Update charge details
            const chargeData = {
                chargeId: charge.id,
                paymentIntentId: charge.payment_intent as string,
                status: charge.status,
                receiptUrl: charge.receipt_url
            };

            // Add your logic here to update charge details
            console.log('Charge updated:', charge.id);
            return chargeData;
        } catch (error) {
            console.error('Error processing charge update:', error);
            throw error;
        }
    };

    const handlePaymentIntentFailed = async (paymentIntent: Stripe.PaymentIntent) => {
        console.log("Processing payment_intent.payment_failed--------------------");
        try {
            const courseId = paymentIntent.metadata?.courseId;
            const userId = paymentIntent.metadata?.userId;
            const instructorId = paymentIntent.metadata?.instructorId;
            const paymentIntentId = paymentIntent.id;
    
            if (!courseId || !userId || !instructorId) {
                console.error("❌ Missing metadata in paymentIntent.payment_failed", paymentIntent);
                throw new Error("Missing metadata in payment failure event");
            }
    
            const failureData: PaymentFailureData = {
                paymentIntentId,
                courseId,
                userId,
                instructorId,
                status: "failed",
                errorMessage: paymentIntent.last_payment_error?.message || "Unknown error",
                failureCode: paymentIntent.last_payment_error?.code || "Unknown failure code",
            };
    
            await updatePaymentIntentFailedUseCase(dependencies).execute(failureData);
            console.log(`❌ Payment failed for Course: ${courseId}, User: ${userId}`);
    
            return failureData;
        } catch (error) {
            console.error("❌ Error processing payment failure:", error);
            throw error;
        }
    };
    
    

    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const signature = req.headers["stripe-signature"] as string;
            const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
            const event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
            
            console.log(`Processing event: ${event.type} [${event.id}]`);

            let response;
            switch (event.type) {
                case "checkout.session.completed":
                    response = await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
                    break;

                case "payment_intent.succeeded":
                    response = await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
                    break;

                case "payment_intent.created":
                    response = await handlePaymentIntentCreated(event.data.object as Stripe.PaymentIntent);
                    break;

                case "charge.succeeded":
                    response = await handleChargeSucceeded(event.data.object as Stripe.Charge);
                    break;

                case "charge.updated":
                    response = await handleChargeUpdated(event.data.object as Stripe.Charge);
                    break;

                case "payment_intent.payment_failed":
                    response = await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
                    break;

                default:
                    console.log(`Unhandled event type: ${event.type}`);
                    break;
            }

            res.status(200).json({ 
                received: true,
                type: event.type,
                id: event.id,
                response 
            });
        } catch (error: any) {
            console.error('Webhook error:', error.message);
            res.status(400).json({ 
                error: 'Webhook Error',
                message: error.message 
            });
        }
    };
};