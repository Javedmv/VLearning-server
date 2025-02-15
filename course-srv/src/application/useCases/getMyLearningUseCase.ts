import { IDependencies } from "../interfaces/IDependencies";

export const getMyLearningUseCase = (dependencies:IDependencies) => {
    const {repositories:{ getAllMyLearning }} = dependencies
    return {
        execute:async (userId:string) => {
            try {
                return await getAllMyLearning(userId)
            } catch (error:any) {
                throw new Error(error?.message || "getMyLearningUseCase fetch failed")
            }
        }
    }
}