import { CourseEntity } from "../entities";

export interface IGetAllCoursesUseCase {
    execute() : Promise<CourseEntity[] | null>
}