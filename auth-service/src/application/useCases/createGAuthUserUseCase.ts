import { IDependencies } from "../interfaces/IDependencies";

export const createGAuthUserUseCase = (dependencies: IDependencies) => {
    const { repositories: { createGAuthUser } } = dependencies;

    return {
        execute: async (data: { email: string; name: string }) => {
            try {
                return await createGAuthUser(data);
            } catch (error: any) {
                throw new Error(error?.message || "Google Auth user creation failed");
            }
        }
    }
}