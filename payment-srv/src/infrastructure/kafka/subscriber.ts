import { addUserConsumer, addCourseConsumer, editCourseConsumer, enrollStudentUserConsumer } from "./consumers";

export interface ISubscriber {
    addUser(data:any): Promise<void>;
    addCourse(data: any) : Promise<void>;
    editCourse(data: any) : Promise<void>;
    enrollStudentUser(data: any) : Promise<void>;
}


export interface IPaymentSubscriber extends Pick<ISubscriber, "addUser" | "addCourse" | "editCourse" | "enrollStudentUser">{}


export const createSubscriber = (): IPaymentSubscriber => {
    return {
        addUser: addUserConsumer,
        addCourse: addCourseConsumer,
        editCourse: editCourseConsumer,
        enrollStudentUser: enrollStudentUserConsumer
    }
}