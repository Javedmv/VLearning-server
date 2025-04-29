import { PTobe } from "../../_lib/constants/Tobe";
import { CourseFilters } from "../../domain/entities";
import { IPaymentHistory } from "../../domain/useCases/IGetPaymentHistoryUseCase";
import { PaymentData, PaymentFailureData, PaymentIntent } from "../../presentation/controllers/stripeWebhookController";

export interface IRepositories {
    userAndCourseDetails:(userId:string,courseId:string) => Promise<PTobe>;
    savePaymentInDb:(courseId:string,userId:string,paymentData:PaymentData) => Promise<PTobe>;
    enrollStudentInCourse:(userId:string,courseId:string) => Promise<PTobe>;
    updatePaymentIntentSucceeded:(paymentIntentData:PaymentIntent) => Promise<void>
    updatePaymentIntentFailed:(failureData:PaymentFailureData) => Promise<PTobe>;
    getPaymentHistory:(userId:string,filters:CourseFilters) => Promise<{ payments: IPaymentHistory[]; total: number }>;
    getInstructorEarnings:(userId:string) => Promise<PTobe>;
    getAdminEarnings:() => Promise<PTobe>;
}