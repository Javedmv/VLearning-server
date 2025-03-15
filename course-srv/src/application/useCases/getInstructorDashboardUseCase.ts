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
        } catch (error) {
            throw new Error("Error fetching instructor dashboard");
        }
    }
}   
}
