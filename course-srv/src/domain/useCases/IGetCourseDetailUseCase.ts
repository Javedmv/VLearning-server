import { CourseEntity } from "../entities";

export interface IGetCourseDetailUseCase {
    execute(courseId:string) : Promise<CourseEntity | null>
}