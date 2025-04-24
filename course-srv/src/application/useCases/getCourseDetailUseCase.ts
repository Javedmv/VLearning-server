 import { IDependencies } from "../interfaces/IDependencies";

export const getCourseDetailUseCase = (dependencies:IDependencies) =>{
    const {repositories: {getCourseDetails}} = dependencies;

    return {
        execute: async (courseId:string) => {
            try {
                return await getCourseDetails(courseId);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error(error.message || "Category fetch failed");
                } else {
                    throw new Error("Category fetch failed due to an unknown error");
                }
            }
            
        }
    }
}