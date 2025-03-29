import { IDependencies } from "../interfaces/IDependencies";

export const getLandingPageCoursesUseCase = (dependencies: IDependencies) => {
    const { repositories: { getLandingPageCourses } } = dependencies;
    return {
        execute: async () => {
            try {
                return await getLandingPageCourses();
        } catch (error:any) {
                throw new Error(error?.message || "category fetch failed")
            }
        }
    }
}