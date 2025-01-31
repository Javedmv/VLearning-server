import { CourseEntity } from "../entities";
import { CourseFilters } from "../entities/CourseFilter";

export interface IGetAllInstructorCoursesUseCase {
    execute(instrId:string,filters:CourseFilters): Promise<any>
}