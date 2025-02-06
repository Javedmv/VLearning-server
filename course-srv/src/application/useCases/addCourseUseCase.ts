import { CourseEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const addCourseUseCase = (dependencies:IDependencies) => {
    const {repositories:{addCourse}} = dependencies;

    return {
        execute:async (course:CourseEntity,instrId:string) => {
            try {
                return await addCourse(course,instrId)
            } catch (error:any) {
                // return null;
                console.error("Error in add Course UseCase:",error.message);
                throw new Error(error?.message || "Course add failed")
            }
        }
    }
}