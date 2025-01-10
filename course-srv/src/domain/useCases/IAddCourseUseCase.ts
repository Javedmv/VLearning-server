import { CourseEntity } from "../entities";

export interface IAddCourseUseCase {
    execute(course:CourseEntity, instrId:string) :Promise<CourseEntity | null>
}