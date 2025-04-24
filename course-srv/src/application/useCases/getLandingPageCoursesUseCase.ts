import { IDependencies } from "../interfaces/IDependencies";

export const getLandingPageCoursesUseCase = (dependencies: IDependencies) => {
    const { repositories: { getLandingPageCourses } } = dependencies;
    return {
        execute: async () => {
            try {
                return await getLandingPageCourses();
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