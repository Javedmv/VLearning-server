import { IDependencies } from "../interfaces/IDependencies";

export const getAllCoursesUseCase = (dependencies:IDependencies) => {
    const {repositories: {getAllCourses}} = dependencies
    return {
        execute: async () => {
            try {
                return await getAllCourses();
            } catch (error:any) {
                throw new Error(error?.message || "category fetch failed")
            }
        }
    }
}