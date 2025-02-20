import { IEnrollmentProgressResult } from "../entities";

export interface ICourseDetailMyLearningUseCase {
    execute(enrollmentId:string, userId:string) : Promise<IEnrollmentProgressResult[]>;
}