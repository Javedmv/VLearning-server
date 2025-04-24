import { PTobe } from "../../_lib/constants/Tobe";
import { addUserConsumer, addCourseConsumer, editCourseConsumer, enrollStudentUserConsumer } from "./consumers";

export interface ISubscriber {
    addUser(data:PTobe): Promise<void>;
    addCourse(data: PTobe) : Promise<void>;
    editCourse(data: PTobe) : Promise<void>;
    enrollStudentUser(data: PTobe) : Promise<void>;
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