import { IDependencies } from "../interfaces/IDependencies";

export const getEarningsUseCase = (dependencies: IDependencies) => {
    const {repositories: { getInstructorEarnings, getAdminEarnings }} = dependencies;
    return {
        execute: async(userId: string, role: string) : Promise<any> => {
            try {
                if(role == 'instructor'){
                    return await getInstructorEarnings(userId);
                }
                if(role === "admin"){
                    return await getAdminEarnings();
                }
                return;
            } catch (error:any) {
                console.log("Error getting earnings useCase error",error);
                throw new Error("Error getting earnings useCase error");
            }
        }
    }
}