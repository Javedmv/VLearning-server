import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import Stripe from "stripe";
import { getCourseProducer, getUserProducer } from "../../infrastructure/kafka/producers";
import { createResponse, StatusCode } from "../../_lib/constants/constants";

export const createSessionController = (dependencies: IDependencies) => {
    const { useCases: { userAndCourseDetailsUseCase } } = dependencies;

    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { userId, courseId } = req.body;
            console.log(userId, "in payment");

            await Promise.all([
                getUserProducer(userId, "auth-srv-topic"),
                getCourseProducer(courseId, "course-srv-topic"),
            ]);
            // TODO: check here weither the userid is added to students[] check it in above producer as well as below useCase
            const { user, course } = await userAndCourseDetailsUseCase(dependencies).execute(userId, courseId);
            if (!user || !course) {
                res.status(StatusCode.NOT_FOUND).json(
                    createResponse(
                        StatusCode.NOT_FOUND,
                        undefined,
                        "User or Course not found"
                    )
                );
                return;
            }

            if (typeof course?.pricing?.amount !== "number" || course?.pricing?.amount <= 0) {
                console.error("Invalid course price:", course?.pricing?.amount);
                res.status(StatusCode.BAD_REQUEST).json(
                    createResponse(
                        StatusCode.BAD_REQUEST,
                        undefined,
                        "Invalid course price"
                    )
                );
                return;
            }

            
            const unitAmount = Math.round(course?.pricing?.amount * 100);
            console.log(`Calculated unit amount: ${unitAmount}`);
            const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY!);
            
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                customer_email: user.email,
                metadata: {
                    courseId: course?._id.toString(),
                    userId: user?._id.toString(),
                    instructorId: course?.instructor.toString(),
                    checkoutSessionId: "" // Temporary placeholder update this later
                },
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
            
            // **Update the session's metadata with the session ID**
            await stripe.checkout.sessions.update(session.id, {
                metadata: {
                    ...session.metadata,
                    checkoutSessionId: session.id
                }
            });
            
            // TODO: read the below line
            // **Store session details in your DB (Optional, recommended)**
            // await createPaymentSessionUseCase(dependencies).execute(
            //     session.id, course._id.toString(), user._id.toString()
            // );
            
            res.status(StatusCode.SUCCESS).json(
                createResponse(
                    StatusCode.SUCCESS,
                    { url: session.url, sessionId: session.id },
                    "Payment link generated successfully"
                )
            );
            return;
            
        } catch (error) {
            console.error("Error in createSessionController:", error);

            res.status(StatusCode.INTERNAL_SERVER_ERROR).json(
                createResponse(
                    StatusCode.INTERNAL_SERVER_ERROR,
                    { error }, // Including the error in the data
                    "Internal Server Error"
                )
            );
        }
    };
};
