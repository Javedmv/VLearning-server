import { addCourseConsumer, addUserConsumer, editCourseConsumer, enrollPaidUserConsumer, enrollStudentUserConsumer } from "./consumer";

export interface ISubscriber {
    addCourse(data: any) : Promise<void>;
    editCourse(data: any) : Promise<void>;
    addUser(data:any): Promise<void>;
    enrollStudentUser(data: any) : Promise<void>;
    enrollPaidUser({userId,courseId}:{userId:string,courseId:string}):Promise<void>;
}

export interface IAuthSubscriber extends Pick<ISubscriber, "addCourse" | "editCourse" | "addUser" | "enrollStudentUser" | "enrollPaidUser"> {}

export const createSubscriber = (): IAuthSubscriber => {
    return {
        addCourse: addCourseConsumer,
        editCourse: editCourseConsumer,
        addUser: addUserConsumer,
        enrollStudentUser: enrollStudentUserConsumer,
        enrollPaidUser: enrollPaidUserConsumer
    }
}