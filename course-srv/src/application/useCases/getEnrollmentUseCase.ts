import { IDependencies } from "../interfaces/IDependencies";

export const getEnrollmentUseCase = (dependencies:IDependencies) => {
    const {repositories:{ getEnrollment }} = dependencies;

    return {
        execute: async (enrollmentId:string) => {
            try {
                return await getEnrollment(enrollmentId);
            } catch (error:any) {
                throw new Error(error?.message || "Enrollment fetch failed")
            }
        }
    }
}