import { IDependencies } from "../interfaces/IDependencies";

export const getCourseDetailUseCase = (dependencies:IDependencies) =>{
    const {repositories: {getCourseDetails}} = dependencies;
    return {
        execute: async (courseId:string) => {
            try {
                return await getCourseDetails(courseId);
            } catch (error) {
                console.log(error);
            }
        }
    }
}