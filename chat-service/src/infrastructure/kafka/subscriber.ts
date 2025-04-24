import { ITOBE } from "../../_lib/constants";
import { addCourseConsumer, addUserConsumer, editCourseConsumer, enrollPaidUserConsumer, enrollStudentUserConsumer } from "./consumer";
import lessonProgressConsumer from "./consumer/lessonProgressConsumer";

export interface ISubscriber {
    addCourse(data: ITOBE) : Promise<void>;
    editCourse(data: ITOBE) : Promise<void>;
    addUser(data:ITOBE): Promise<void>;
    enrollStudentUser(data: ITOBE) : Promise<void>;
    enrollPaidUser({userId,courseId}:{userId:string,courseId:string}):Promise<void>;
    lessonProgress(enrollmentData:ITOBE) : Promise<void>;
}

export interface IAuthSubscriber extends Pick<ISubscriber, "addCourse" | "editCourse" | "addUser" | "enrollStudentUser" | "enrollPaidUser" | "lessonProgress"> {}

export const createSubscriber = (): IAuthSubscriber => {
    return {
        addCourse: addCourseConsumer,
        editCourse: editCourseConsumer,
        addUser: addUserConsumer,
        enrollStudentUser: enrollStudentUserConsumer,
        enrollPaidUser: enrollPaidUserConsumer,
        lessonProgress: lessonProgressConsumer
    }
}