import { ITOBE } from "../../_lib/constants";

export interface IadminGetAllDashboardDataUseCase {
    execute () : Promise<ITOBE>;
}