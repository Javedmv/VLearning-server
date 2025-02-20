import { LessonObject } from "../../presentation/controllers/courseController/postupdatedWatched";
import { IDependencies } from "../interfaces/IDependencies";

export const updateProgressUseCase = (dependencies:IDependencies) => {
    const {repositories:{updateProgress}} = dependencies;
    return{
        execute: async (enrollmentId:string,lessonObject:LessonObject,allLessons:LessonObject[]) => {
            try {
                return await updateProgress(enrollmentId,lessonObject,allLessons)
            } catch (error) {
                console.error("ERROR IN updateProgressUseCase",error)
                throw new Error("Something went wrong.")
            }
        }
    }
}