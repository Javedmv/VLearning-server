import { lessonProgressProducer } from "../../infrastructure/kafka/producers";
import { LessonObject } from "../../presentation/controllers/courseController/postupdatedWatched";
import { IDependencies } from "../interfaces/IDependencies";

export const updateProgressUseCase = (dependencies:IDependencies) => {
    const {repositories:{updateProgress}} = dependencies;
    return{
        execute: async (enrollmentId:string,lessonObject:LessonObject,allLessons:LessonObject[]) => {
            try {
                const updatedEnrollment = await updateProgress(enrollmentId,lessonObject,allLessons)
                if(!updatedEnrollment){
                    return false;
                }
                await lessonProgressProducer(updatedEnrollment,"chat-srv-topic");
                return true;
            } catch (error) {
                console.error("ERROR IN updateProgressUseCase",error)
                throw new Error("Something went wrong.")
            }
        }
    }
}