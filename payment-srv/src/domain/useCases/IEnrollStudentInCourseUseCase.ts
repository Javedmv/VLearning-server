import { PTobe } from "../../_lib/constants/Tobe";

export interface IEnrollStudentInCourseUseCase {
    execute(userId:string, courseId:string) : Promise<PTobe>
}