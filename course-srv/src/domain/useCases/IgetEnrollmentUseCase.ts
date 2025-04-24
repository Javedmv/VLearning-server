import { TOBE } from "../../_lib/common/Tobe";

export interface IgetEnrollmentUseCase {
    execute(enrollmentId:string) : Promise<TOBE>
}