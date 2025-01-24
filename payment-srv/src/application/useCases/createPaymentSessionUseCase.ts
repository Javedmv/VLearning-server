import { IDependencies } from "../interfaces/IDependencies";

export const createPaymentSessionUseCase = (dependencies:IDependencies) => {
    const {repositories:{createPaymentSession}} = dependencies;
    return {
        execute: async (sessionId:string,courseId:string,userId:string):Promise<any> => {
            try {
                return await createPaymentSession(sessionId,courseId,userId);
            } catch (error:any) {
                throw new Error(error?.message || "User and Course details fetch useCase")
            }
        }
    }
}