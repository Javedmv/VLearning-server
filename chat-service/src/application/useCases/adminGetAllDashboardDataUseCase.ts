import { ITOBE } from "../../_lib/constants";
import { IDependencies } from "../interfaces/IDependencies";

export const adminGetAllDashboardDataUseCase = (dependencies: IDependencies) => {
    const { repositories: { adminGetAllDashboardData } } = dependencies;

    return {
        execute: async (): Promise<ITOBE> => {
            try {
                return await adminGetAllDashboardData();
            } catch (error) {
                throw new Error("Error getting all courses");
            }
        }
    };
};
