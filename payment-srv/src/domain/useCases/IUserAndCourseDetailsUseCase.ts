import { PTobe } from "../../_lib/constants/Tobe";

export interface IUserAndCourseDetailsUseCase {
    execute(userId:string,courseId:string): Promise<PTobe>
}