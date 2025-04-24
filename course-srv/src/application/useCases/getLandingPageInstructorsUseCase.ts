import { IDependencies } from "../interfaces/IDependencies";

export const getLandingPageInstructorsUseCase = (dependencies: IDependencies) => {
    const { repositories: { getLandingPageInstructors } } = dependencies;
    return {
        execute: async () => {
            try {
                return await getLandingPageInstructors();
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
