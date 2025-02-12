import { PaymentData, PaymentFailureData, PaymentIntent } from "../../presentation/controllers/stripeWebhookController";

export interface IRepositories {
    userAndCourseDetails:(userId:string,courseId:string) => Promise<any>;
    savePaymentInDb:(courseId:string,userId:string,paymentData:PaymentData) => Promise<any>;
    enrollStudentInCourse:(userId:string,courseId:string) => Promise<any>;
    updatePaymentIntentSucceeded:(paymentIntentData:PaymentIntent) => Promise<void>
    updatePaymentIntentFailed:(failureData:PaymentFailureData) => Promise<any>;
}