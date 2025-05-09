import { IEnrollmentProgressResult } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const courseDetailMyLearningUseCase = (dependencies:IDependencies) => {
    const { repositories:{courseDetailMyLearning} } = dependencies;
    return {
        execute: async (enrollmentId:string, userId:string):Promise<IEnrollmentProgressResult[]> => {
            try {
                const enrollment: IEnrollmentProgressResult[] = await courseDetailMyLearning(enrollmentId,userId);
                // if(enrollment.userId._id !== userId) {
                //     throw new Error("User not authorized");
                // }
                return enrollment as IEnrollmentProgressResult[];
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.log("ERROR COURSE DETAIL MY LEARNING USE CASE:", error.message);
                } else {
                    console.log("ERROR COURSE DETAIL MY LEARNING USE CASE: Unknown error", error);
                }
                throw new Error("Error in get courseDetailMyLearning use case");
            }
            
        }
    }
}