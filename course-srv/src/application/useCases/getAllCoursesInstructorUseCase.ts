import { IDependencies } from "../interfaces/IDependencies";

export const getAllCoursesInstructorUseCase = (dependencies:IDependencies) => {
    const {repositories: {getAllCoursesInstructor}} = dependencies
    return {
        execute: async (instructorId:string) => {
            try {
                return await getAllCoursesInstructor(instructorId);
            } catch (error:any) {
                throw new Error(error?.message || "getAllCoursesInstructorUseCase Error")
            }
        }
    }
}