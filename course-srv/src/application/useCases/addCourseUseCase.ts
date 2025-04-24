import { CourseEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const addCourseUseCase = (dependencies:IDependencies) => {
    const {repositories:{addCourse}} = dependencies;

    return {
        execute:async (course:CourseEntity,instrId:string) => {
            try {
                return await addCourse(course,instrId)
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error("Error in add Course UseCase:", error.message);
                    throw new Error(error.message || "Course add failed");
                } else {
                    console.error("Error in add Course UseCase: Unknown error", error);
                    throw new Error("Course add failed due to an unknown error");
                }
            }
            
        }
    }
}