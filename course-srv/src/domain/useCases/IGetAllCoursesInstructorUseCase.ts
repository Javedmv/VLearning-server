export interface IGetAllCoursesInstructorUseCase {
    execute(instructorId:string): Promise<any>
}