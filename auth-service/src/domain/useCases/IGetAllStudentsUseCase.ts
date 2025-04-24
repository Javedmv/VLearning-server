import { TOBE } from "../../_lib/utils/Tobe";
import { UserEntity } from "../entities";
import { CourseFilters } from "../entities/CourseFilter";

export interface IGetAllStudentsUseCase{
    execute(filters:CourseFilters):Promise<TOBE>;
}