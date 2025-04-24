import { TOBE } from "../../_lib/common/Tobe";

export interface IGetAllCoursesInstructorUseCase {
    execute(instructorId:string): Promise<TOBE>
}