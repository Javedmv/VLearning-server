import { addUserConsumer, getCourseDetailsFromPaymentConsumer, enrollPaidUserConsumer } from "./consumers";

export interface ISubscriber {
    addUser(data:any): Promise<void>;
    getCourseDetailsFromPayment(courseId:string):Promise<void>;
    EnrollPaidUser(userId:string,courseId:string):Promise<void>;
}


export interface ICourseSubscriber extends Pick<ISubscriber, "addUser" | "getCourseDetailsFromPayment" | "EnrollPaidUser">{}


export const createSubscriber = (): ICourseSubscriber => {
    return {
        addUser: addUserConsumer,
        getCourseDetailsFromPayment: getCourseDetailsFromPaymentConsumer,
        EnrollPaidUser: enrollPaidUserConsumer
    }
}