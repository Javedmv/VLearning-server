import { TOBE } from "../../_lib/common/Tobe";

export interface IgetInstructorDashboardUseCase {
    execute(instructorId: string) : Promise<TOBE>;
}