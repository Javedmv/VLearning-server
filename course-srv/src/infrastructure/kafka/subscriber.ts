import { TOBE } from "../../_lib/common/Tobe";
import { addUserConsumer, getCourseDetailsFromPaymentConsumer, enrollPaidUserConsumer } from "./consumers";

export interface ISubscriber {
    addUser(data:TOBE): Promise<void>;
    getCourseDetailsFromPayment(courseId:string):Promise<void>;
    enrollPaidUser({userId,courseId}:{userId:string,courseId:string}):Promise<void>;
}


export interface ICourseSubscriber extends Pick<ISubscriber, "addUser" | "getCourseDetailsFromPayment" | "enrollPaidUser">{}


export const createSubscriber = (): ICourseSubscriber => {
    return {
        addUser: addUserConsumer,
        getCourseDetailsFromPayment: getCourseDetailsFromPaymentConsumer,
        enrollPaidUser: enrollPaidUserConsumer
    }
}