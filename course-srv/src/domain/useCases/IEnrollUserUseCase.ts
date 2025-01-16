import { IDependencies } from "../../application/interfaces/IDependencies";
import { CourseEntity } from "../entities";

export interface IEnrollUserUseCase {
    execute(courseId:string,userId:string):Promise<CourseEntity | null>
}