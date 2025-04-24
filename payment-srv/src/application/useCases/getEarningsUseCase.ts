import { PTobe } from "../../_lib/constants/Tobe";
import { IDependencies } from "../interfaces/IDependencies";

export const getEarningsUseCase = (dependencies: IDependencies) => {
    const {repositories: { getInstructorEarnings, getAdminEarnings }} = dependencies;
    return {
        execute: async(userId: string, role: string) : Promise<PTobe> => {
            try {
                if(role == 'instructor'){
                    return await getInstructorEarnings(userId);
                }
                if(role === "admin"){
                    return await getAdminEarnings();
                }
                return;
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.log("Error getting earnings useCase:", error);
                    throw new Error("Error getting earnings useCase error: " + error.message);
                } else {
                    console.log("An unknown error occurred while getting earnings useCase");
                    throw new Error("Error getting earnings useCase error: Unknown error occurred");
                }
            }
            
        }
    }
}