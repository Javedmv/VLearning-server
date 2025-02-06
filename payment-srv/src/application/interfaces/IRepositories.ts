import { PaymentData } from "../../presentation/controllers/stripeWebhookController";

export interface IRepositories {
    userAndCourseDetails:(userId:string,courseId:string) => Promise<any>;
    savePaymentInDb:(courseId:string,userId:string,paymentData:PaymentData) => Promise<any>;
    enrollStudentInCourse:(userId:string,courseId:string) => Promise<any>;
}