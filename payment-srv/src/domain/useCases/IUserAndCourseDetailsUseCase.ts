export interface IUserAndCourseDetailsUseCase {
    execute(userId:string,courseId:string): Promise<any>
}