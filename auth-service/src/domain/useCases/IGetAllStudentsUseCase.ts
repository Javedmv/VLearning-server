import { UserEntity } from "../entities";
import { CourseFilters } from "../entities/CourseFilter";

export interface IGetAllStudentsUseCase{
    execute(filters:CourseFilters):Promise<any>;
}