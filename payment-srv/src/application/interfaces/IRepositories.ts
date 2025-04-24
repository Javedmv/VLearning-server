import { PTobe } from "../../_lib/constants/Tobe";
import { IPaymentHistory } from "../../domain/useCases/IGetPaymentHistoryUseCase";
import { PaymentData, PaymentFailureData, PaymentIntent } from "../../presentation/controllers/stripeWebhookController";

export interface IRepositories {
    userAndCourseDetails:(userId:string,courseId:string) => Promise<PTobe>;
    savePaymentInDb:(courseId:string,userId:string,paymentData:PaymentData) => Promise<PTobe>;
    enrollStudentInCourse:(userId:string,courseId:string) => Promise<PTobe>;
    updatePaymentIntentSucceeded:(paymentIntentData:PaymentIntent) => Promise<void>
    updatePaymentIntentFailed:(failureData:PaymentFailureData) => Promise<PTobe>;
    getPaymentHistory:(userId:string) => Promise<IPaymentHistory[]>;
    getInstructorEarnings:(userId:string) => Promise<PTobe>;
    getAdminEarnings:() => Promise<PTobe>;
}