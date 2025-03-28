export interface IgetEnrollmentUseCase {
    execute(enrollmentId:string) : Promise<any>
}