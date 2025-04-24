import { ITOBE } from "../../_lib/constants";

export interface IadminGetEnrollmentDataUseCase {
    execute () : Promise<ITOBE>;
}