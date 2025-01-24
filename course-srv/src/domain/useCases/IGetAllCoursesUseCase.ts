import { CourseEntity } from "../entities";
import { CourseFilters } from "../entities/CourseFilter";

export interface IGetAllCoursesUseCase {
    execute(filters:CourseFilters) : Promise<any>
}