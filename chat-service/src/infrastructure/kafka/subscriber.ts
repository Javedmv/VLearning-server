import { addCourseConsumer, editCourseConsumer } from "./consumer";

export interface ISubscriber {
    addCourse(data: any) : Promise<void>;
    editCourse(data: any) : Promise<void>;

}

export interface IAuthSubscriber extends Pick<ISubscriber, "addCourse" | "editCourse"> {}

export const createSubscriber = (): IAuthSubscriber => {
    return {
        addCourse: addCourseConsumer,
        editCourse: editCourseConsumer,
    }
}