import { IDependencies } from "../interfaces/IDependencies";

export const getMyLearningUseCase = (dependencies:IDependencies) => {
    const {repositories:{ getAllMyLearning }} = dependencies
    return {
        execute:async (userId:string) => {
            try {
                return await getAllMyLearning(userId)
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error(error.message || "getMyLearningUseCase fetch failed");
                } else {
                    throw new Error("getMyLearningUseCase fetch failed due to an unknown error");
                }
            }
            
        }
    }
}