export interface IgetInstructorDashboardUseCase {
    execute(instructorId: string) : Promise<any>;
}