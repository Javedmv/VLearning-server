import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import Stripe from "stripe";
import { getCourseProducer, getUserProducer } from "../../infrastructure/kafka/producers";

export const createSessionController = (dependencies: IDependencies) => {
    const { useCases: { userAndCourseDetailsUseCase, createPaymentSessionUseCase } } = dependencies;

    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { userId, courseId } = req.body;
            console.log(userId, "in payment");

            await Promise.all([
                getUserProducer(userId, "auth-srv-topic"),
                getCourseProducer(courseId, "course-srv-topic"),
            ]);

            const { user, course } = await userAndCourseDetailsUseCase(dependencies).execute(userId, courseId);
            if (!user || !course) {
                res.status(404).json({ message: "User or Course not found" });
                return;
            }

            if (typeof course?.pricing?.amount !== "number" || course?.pricing?.amount <= 0) {
                console.error("Invalid course price:", course?.pricing?.amount);
                res.status(400).json({ message: "Invalid course price" });
                return;
            }

            
            const unitAmount = Math.round(course?.pricing?.amount * 100);
            console.log(`Calculated unit amount: ${unitAmount}`);
            const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY!);
            
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                customer_email: user.email,
                line_items: [
                    {
                        price_data: {
                            currency: "inr",
                            product_data: {
                                name: course.basicDetails.title,
                                images: [course.basicDetails.thumbnail],
                            },
                            unit_amount: unitAmount,
                        },
                        quantity: 1,
                    },
                ],
                success_url: `${process.env.FRONTEND_URL}/payment/success/courseId=${course._id}`,
                cancel_url: `${process.env.FRONTEND_URL}/payment/failed/courseId=${course._id}`,
            });

            const response = await createPaymentSessionUseCase(dependencies).execute(session.id,courseId,userId);

            res.status(200).json({
                data: session.url, // Changed to `session.url` for a valid payment link
            });
            return;
        } catch (error) {
            console.error("Error in createSessionController:", error);
            res.status(500).json({ message: "Internal Server Error", error });
        }
    };
};
