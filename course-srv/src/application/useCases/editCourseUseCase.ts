import { TOBE } from "../../_lib/common/Tobe";
import { IDependencies } from "../interfaces/IDependencies";

export const editCourseUseCase = (dependencies:IDependencies) => {
    const {repositories: {editCourse}} = dependencies
    return {
        execute: async (courseId:string, updates:TOBE,removeLessonIndex:number[]) => {
            try {
                return await editCourse(courseId,updates,removeLessonIndex);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error(error.message || "editCourseUseCase failed");
                } else {
                    throw new Error("editCourseUseCase failed due to an unknown error");
                }
            }
            
        }
    }
}