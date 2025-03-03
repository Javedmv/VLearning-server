import { addCourseConsumer, addUserConsumer, editCourseConsumer, enrollPaidUserConsumer, enrollStudentUserConsumer } from "./consumer";
import lessonProgressConsumer from "./consumer/lessonProgressConsumer";

export interface ISubscriber {
    addCourse(data: any) : Promise<void>;
    editCourse(data: any) : Promise<void>;
    addUser(data:any): Promise<void>;
    enrollStudentUser(data: any) : Promise<void>;
    enrollPaidUser({userId,courseId}:{userId:string,courseId:string}):Promise<void>;
    lessonProgress(enrollmentData:any) : Promise<void>;
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