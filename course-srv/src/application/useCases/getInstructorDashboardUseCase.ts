import { IDependencies } from "../interfaces/IDependencies";

export const getInstructorDashboardUseCase = (dependencies: IDependencies) => {
    const {repositories: {instructorRepository}} = dependencies;
    return{
        execute: async (instructorId: string) => {
        try {
            const instructor = await instructorRepository(instructorId);
            if(!instructor){
                throw new Error("Instructor not found");
            }
            return instructor;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message || "Error fetching instructor dashboard");
            } else {
                throw new Error("Error fetching instructor dashboard due to an unknown error");
            }
        }
        
    }
}   
}
