import { PaymentData } from "../../presentation/controllers/stripeWebhookController";
import { IDependencies } from "../interfaces/IDependencies";

export const savePaymentDBUseCase = (dependencies:IDependencies) => {
    const {repositories:{savePaymentInDb}} = dependencies;
    return {
        execute: async (courseId:string,userId:string, paymentData:PaymentData):Promise<any> => {
            try {
                return await savePaymentInDb(courseId,userId,paymentData);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error(error.message || "User and Course details fetch useCase");
                } else {
                    throw new Error("User and Course details fetch useCase: Unknown error occurred");
                }
            }
            
        }
    }
}