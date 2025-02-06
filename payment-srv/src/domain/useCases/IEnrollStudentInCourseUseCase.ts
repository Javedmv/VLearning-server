export interface IEnrollStudentInCourseUseCase {
    execute(userId:string, courseId:string) : Promise<any>
}