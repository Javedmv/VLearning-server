import { TOBE } from "../../_lib/common/Tobe";
import { CourseFilters } from "../entities/CourseFilter";

export interface getMyLearningUseCase {
    execute(userId:string,filters:CourseFilters) : Promise<TOBE>
}