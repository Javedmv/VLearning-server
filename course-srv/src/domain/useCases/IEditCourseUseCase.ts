export interface IEditCourseUseCase {
    execute(courseId:string, updates:any, removeLessonIndex:number[]): Promise<any>;
}