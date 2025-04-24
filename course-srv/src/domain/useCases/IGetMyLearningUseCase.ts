import { TOBE } from "../../_lib/common/Tobe";
import { CourseEntity } from "../entities";

export interface getMyLearningUseCase {
    execute(userId:string) : Promise<TOBE>
}