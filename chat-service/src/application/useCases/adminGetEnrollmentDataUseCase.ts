import { IDependencies } from "../interfaces/IDependencies";

export const adminGetEnrollmentDataUseCase = (dependencies:IDependencies) => {
    const {repositories:{adminGetEnrollmentData}} = dependencies;

    return {
        execute: async () => {
            try {
                const enrollmentData = await adminGetEnrollmentData();
                return enrollmentData;
            } catch (error) {
                throw new Error("Error getting enrollment data");
            }
        }
    }
}