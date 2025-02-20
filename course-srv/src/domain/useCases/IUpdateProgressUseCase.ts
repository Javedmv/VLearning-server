import { LessonObject } from "../../presentation/controllers/courseController/postupdatedWatched";

export interface IUpdateProgressUseCase {
    execute(enrollmentId:string,lessonObject:LessonObject,allLessons:LessonObject[]): Promise<boolean>; 
}