import { addUserConsumer, getCourseDetailsFromPaymentConsumer } from "./consumers";

export interface ISubscriber {
    addUser(data:any): Promise<void>;
    getCourseDetailsFromPayment(courseId:string):Promise<void>;
}


export interface ICourseSubscriber extends Pick<ISubscriber, "addUser" | "getCourseDetailsFromPayment">{}


export const createSubscriber = (): ICourseSubscriber => {
    return {
        addUser: addUserConsumer,
        getCourseDetailsFromPayment: getCourseDetailsFromPaymentConsumer
    }
}