export interface IRepositories {
    userAndCourseDetails:(userId:string,courseId:string) => Promise<any>;
    createPaymentSession:(sessionId:string,courseId:string,userId:string) => Promise<any>;
}