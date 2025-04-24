import { TOBE } from "../../_lib/common/Tobe";

export interface IEditCourseUseCase {
    execute(courseId:string, updates:TOBE, removeLessonIndex:number[]): Promise<TOBE>;
}