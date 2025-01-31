import { CourseFilters } from "../../domain/entities/CourseFilter";
import { IDependencies } from "../interfaces/IDependencies";

export const getAllStudentsUseCase = (dependencies:IDependencies) => {
    const {repositories: {getStudentUser}} = dependencies;
    return {
        execute: async (filters:CourseFilters) => {
            return await getStudentUser(filters);
        }
    }
}