import { addUserConsumer, addCourseConsumer, editCourseConsumer } from "./consumers";

export interface ISubscriber {
    addUser(data:any): Promise<void>;
    addCourse(data: any) : Promise<void>;
    editCourse(data: any) : Promise<void>;
}


export interface IPaymentSubscriber extends Pick<ISubscriber, "addUser" | "addCourse" | "editCourse">{}


export const createSubscriber = (): IPaymentSubscriber => {
    return {
        addUser: addUserConsumer,
        addCourse: addCourseConsumer,
        editCourse: editCourseConsumer
    }
}