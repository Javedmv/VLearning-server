import { IDependencies } from "../interfaces/IDependencies";

export const enrollUserUseCase = (dependencies:IDependencies) => {
    const {repositories:{enrollUser }} = dependencies;
    return {
        execute:async(courseId:string,userId:string) => {
            try {
                return await enrollUser(courseId,userId);
            } catch (error:any) {
                throw new Error(error?.message || "Enroll User failed")
            }
        }
    }
}