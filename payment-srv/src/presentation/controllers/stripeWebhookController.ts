import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { config } from "dotenv";

config();
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY!);

export const stripeWebhookController = (dependencies: IDependencies) => {
    const { useCases: { createPaymentSessionUseCase } } = dependencies;

    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            console.log("Webhook hit ----------------------------------------------------");
            console.log(req.params, "Params");
            console.log("Raw Body:",req.body);
            console.log('Headers:', req.headers);
            console.log("=-==================================================== ----------------------------------------------------");

            const signature = req.headers["stripe-signature"] as string;
            const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
            const event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
            console.log(event,"event has been consoled")

            switch (event.type) {
                case "checkout.session.completed":
                    console.log("inside Checkout Session Completed");
                    const session = event.data.object as Stripe.Checkout.Session;
                    // const courseId = session.metadata.courseId;
                    // const userId = session.metadata.userId;
                    // const response = await createPaymentSessionUseCase(dependencies).execute(session.id, courseId, userId);
                    // console.log(response);
                    break;

                case "payment_intent.payment_failed":
                    console.log("Payment Intent Failed");
                    const paymentIntent = event.data.object as Stripe.PaymentIntent;
                    // Add your logic here for handling the failed payment
                    break;

                default:
                    console.warn(`Unhandled event type ${event.type}`);
                    break;
            }

            res.status(200).json({ received: true });
        } catch (error: any) {
            console.error(error.message, "Error in fetching user and course details");
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
}