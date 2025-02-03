import { CourseFilters } from "../../domain/entities/CourseFilter";
import { InstructorUserResult } from "../../infrastructure/database/mongoDB/repositories";
import { IDependencies } from "../interfaces/IDependencies";

export const getAllInstructorsUseCase = (dependencies:IDependencies) => {
    const {repositories: {getInstructorUser} } = dependencies;
    return {
        execute: async (filters:CourseFilters) => {
            try {
                const result = await getInstructorUser(filters)
                console.log(result, "result in usecase")
                return result ?? null
            } catch (error) {
                console.log(null)
            }
        }
    }
}