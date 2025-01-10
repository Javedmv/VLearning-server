import { IDependencies } from "../interfaces/IDependencies";

export const getAllInstructorCoursesUseCase = (dependencies:IDependencies) => {
    const {repositories: {getAllInstructorCourses}} = dependencies;

    return {
        execute: async (instrId:string) => {
            try {
                return await getAllInstructorCourses(instrId)
            } catch (error:any) {
                throw new Error(error?.message || "category fetch failed")
            }
        }
    }
}
