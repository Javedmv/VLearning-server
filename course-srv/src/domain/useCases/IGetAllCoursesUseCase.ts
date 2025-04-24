import { TOBE } from "../../_lib/common/Tobe";
import { CourseEntity } from "../entities";
import { CourseFilters } from "../entities/CourseFilter";

export interface IGetAllCoursesUseCase {
    execute(filters:CourseFilters) : Promise<TOBE>
}