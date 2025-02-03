import { InstructorUserResult } from "../../infrastructure/database/mongoDB/repositories";
import { CourseFilters } from "../entities/CourseFilter";

export interface IGetAllInstructorsUseCase {
    execute(filters:CourseFilters): Promise<any>
}