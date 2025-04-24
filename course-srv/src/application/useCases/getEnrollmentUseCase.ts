import { IDependencies } from "../interfaces/IDependencies";

export const getEnrollmentUseCase = (dependencies:IDependencies) => {
    const {repositories:{ getEnrollment }} = dependencies;

    return {
        execute: async (enrollmentId:string) => {
            try {
                return await getEnrollment(enrollmentId);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error(error.message || "Enrollment fetch failed");
                } else {
                    throw new Error("Enrollment fetch failed due to an unknown error");
                }
            }
            
        }
    }
}