import { IDependencies } from "../interfaces/IDependencies";

export const adminGetAllDashboardDataUseCase = (dependencies: IDependencies) => {
    const { repositories: { adminGetAllDashboardData } } = dependencies;

    return {
        execute: async (): Promise<any> => {
            try {
                return await adminGetAllDashboardData();
            } catch (error) {
                throw new Error("Error getting all courses");
            }
        }
    };
};
