import { CourseEntity } from "../entities";

export interface IGetAllInstructorCoursesUseCase {
    execute(instrId:string): Promise<CourseEntity[] | null>
}