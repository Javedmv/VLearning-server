import { IDependencies } from "../interfaces/IDependencies";

export const getLandingPageInstructorsUseCase = (dependencies: IDependencies) => {
    const { repositories: { getLandingPageInstructors } } = dependencies;
    return {
        execute: async () => {
            try {
                return await getLandingPageInstructors();
            } catch (error:any) {
                throw new Error(error?.message || "category fetch failed")
            }
        }
    }
}
