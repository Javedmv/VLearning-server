import { IDependencies } from "../interfaces/IDependencies";

export const adminGetPopularCoursesUseCase = (dependencies: IDependencies) => {
    const { repositories: { adminGetPopularCourses } } = dependencies;

    return {
        execute: async (): Promise<any> => {
            try {
                return await adminGetPopularCourses();
            } catch (error) {
                throw new Error("Error getting popular courses");
            }
        }
    }
}