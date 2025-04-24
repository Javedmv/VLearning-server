import { CourseFilters } from "../../domain/entities/CourseFilter";
import { IDependencies } from "../interfaces/IDependencies";

export const getAllInstructorCoursesUseCase = (dependencies:IDependencies) => {
    const {repositories: {getAllInstructorCourses}} = dependencies;

    return {
        execute: async (instrId:string,filters:CourseFilters) => {
            try {
                return await getAllInstructorCourses(instrId,filters);
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
