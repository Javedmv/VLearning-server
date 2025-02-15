import { CourseEntity } from "../entities";

export interface getMyLearningUseCase {
    execute(userId:string) : Promise<any>
}