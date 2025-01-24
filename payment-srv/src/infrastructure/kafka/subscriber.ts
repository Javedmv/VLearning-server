import { addUserConsumer, addCourseConsumer } from "./consumers";

export interface ISubscriber {
    addUser(data:any): Promise<void>;
    addCourse(data: any) : Promise<void>;
}


export interface IPaymentSubscriber extends Pick<ISubscriber, "addUser" | "addCourse" >{}


export const createSubscriber = (): IPaymentSubscriber => {
    return {
        addUser: addUserConsumer,
        addCourse: addCourseConsumer
    }
}