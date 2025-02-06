import { PaymentData } from "../../presentation/controllers/stripeWebhookController";
import { IDependencies } from "../interfaces/IDependencies";

export const savePaymentDBUseCase = (dependencies:IDependencies) => {
    const {repositories:{savePaymentInDb}} = dependencies;
    return {
        execute: async (courseId:string,userId:string, paymentData:PaymentData):Promise<any> => {
            try {
                return await savePaymentInDb(courseId,userId,paymentData);
            } catch (error:any) {
                throw new Error(error?.message || "User and Course details fetch useCase")
            }
        }
    }
}