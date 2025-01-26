export interface IGetInstructorDetailsUseCase {
    execute(instrId:string): Promise<any>
}