import { IDependencies } from "../interfaces/IDependencies";

export const getAllCoursesInstructorUseCase = (dependencies:IDependencies) => {
    const {repositories: {getAllCoursesInstructor}} = dependencies
    return {
        execute: async (instructorId:string) => {
            try {
                return await getAllCoursesInstructor(instructorId);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error(error.message || "getAllCoursesInstructorUseCase Error");
                } else {
                    throw new Error("getAllCoursesInstructorUseCase failed due to an unknown error");
                }
            }
            
        }
    }
}