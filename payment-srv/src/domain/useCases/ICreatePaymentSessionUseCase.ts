export interface ICreatePaymentSessionUseCase {
    execute(sessionId:string,courseId:string,userId:string) : Promise<any>
}