import { TOBE } from "../../_lib/common/Tobe";

export interface IGetInstructorDetailsUseCase {
    execute(instrId:string): Promise<TOBE>
}