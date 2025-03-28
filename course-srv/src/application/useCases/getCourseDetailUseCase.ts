 import { IDependencies } from "../interfaces/IDependencies";

export const getCourseDetailUseCase = (dependencies:IDependencies) =>{
    const {repositories: {getCourseDetails}} = dependencies;

    return {
        execute: async (courseId:string) => {
            try {
                return await getCourseDetails(courseId);
            } catch (error:any) {
                throw new Error(error?.message || "category fetch failed")
            }
        }
    }
}