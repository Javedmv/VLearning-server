import { CourseFilters } from "../../domain/entities/CourseFilter";
import { IDependencies } from "../interfaces/IDependencies";

export const getAllInstructorCoursesUseCase = (dependencies:IDependencies) => {
    const {repositories: {getAllInstructorCourses}} = dependencies;

    return {
        execute: async (instrId:string,filters:CourseFilters) => {
            try {
                return await getAllInstructorCourses(instrId,filters);
            } catch (error:any) {
                throw new Error(error?.message || "category fetch failed")
            }
        }
    }
}
