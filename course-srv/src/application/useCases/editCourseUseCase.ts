import { IDependencies } from "../interfaces/IDependencies";

export const editCourseUseCase = (dependencies:IDependencies) => {
    const {repositories: {editCourse}} = dependencies
    return {
        execute: async (courseId:string, updates:any,removeLessonIndex:number[]) => {
            try {
                return await editCourse(courseId,updates,removeLessonIndex);
            } catch (error:any) {
                throw new Error(error?.message || "editCourseUseCase failed")
            }
        }
    }
}