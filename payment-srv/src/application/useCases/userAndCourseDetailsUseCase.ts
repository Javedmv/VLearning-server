import { IDependencies } from "../interfaces/IDependencies";

export const userAndCourseDetailsUseCase = (dependencies:IDependencies) => {
    const {repositories:{userAndCourseDetails}} = dependencies;
    return {
        execute: async (userId:string, courseId:string) => {
            try {
                return await userAndCourseDetails(userId,courseId);
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