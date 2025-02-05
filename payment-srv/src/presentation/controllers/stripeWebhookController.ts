import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { config } from "dotenv";
import Stripe from "stripe";

config();

const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY!);

interface PaymentData {
    paymentIntentId: string;
    chargeId: string;
    amount: number;
    currency: string;
    status: string;
    customerEmail?: string;
    metadata?: any;
}

export const stripeWebhookController = (dependencies: IDependencies) => {
    const { useCases: { createPaymentSessionUseCase } } = dependencies;

    const handleCheckoutSessionCompleted = async (session: Stripe.Checkout.Session) => {
        console.log("Processing checkout.session.completed");
        try {
            // Extract relevant data
            const courseId = session.metadata?.courseId!;
            const userId = session.metadata?.userId!;
            const instructorId = session.metadata?.instructorId!;

            
            // Store session details
            const paymentData: PaymentData = {
                paymentIntentId: session.payment_intent as string,
                chargeId: '', // Will be updated in charge.succeeded
                amount: session.amount_total || 0,
                currency: session.currency || 'inr',
                status: session.status || 'completed',
                customerEmail: session.customer_email!,
                metadata: session.metadata
            };

            // Process the session
            const response = await createPaymentSessionUseCase(dependencies)
                .execute(session.id, courseId, userId);
            
            console.log('Checkout session processed:', session.id);
            return response;
        } catch (error) {
            console.error('Error processing checkout session:', error);
            throw error;
        }
    };

    const handlePaymentIntentSucceeded = async (paymentIntent: Stripe.PaymentIntent) => {
        console.log("Processing payment_intent.succeeded");
        try {
            const courseId = paymentIntent.metadata?.courseId!;
            const userId = paymentIntent.metadata?.userId!;
            const instructorId = paymentIntent.metadata?.instructorId!;

            
            // Update payment status
            const paymentData = {
                paymentIntentId: paymentIntent.id,
                status: paymentIntent.status,
                amount: paymentIntent.amount,
                currency: paymentIntent.currency,
                metadata: paymentIntent.metadata
            };

            // Add your logic here to update payment status in database
            console.log('Payment intent succeeded:', paymentIntent.id);
            return paymentData;
        } catch (error) {
            console.error('Error processing payment intent:', error);
            throw error;
        }
    };

    const handlePaymentIntentCreated = async (paymentIntent: Stripe.PaymentIntent) => {
        console.log("Processing payment_intent.created");
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
        console.log("Processing payment_intent.payment_failed");
        try {
            // Extract metadata
            const courseId = paymentIntent.metadata?.courseId!;
            const userId = paymentIntent.metadata?.userId!;
            const instructorId = paymentIntent.metadata?.instructorId!;
    
            // Handle failed payment
            const failureData = {
                paymentIntentId: paymentIntent.id,
                courseId,
                userId,
                instructorId,
                status: 'failed',
                errorMessage: paymentIntent.last_payment_error?.message,
                failureCode: paymentIntent.last_payment_error?.code
            };
    
            // Add your logic here to handle payment failure
            console.log('Payment failed for course:', courseId, 'by user:', userId);
            return failureData;
        } catch (error) {
            console.error('Error processing payment failure:', error);
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