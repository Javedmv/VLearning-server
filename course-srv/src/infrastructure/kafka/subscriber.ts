import { addUserConsumer } from "./consumers";

export interface ISubscriber {
    addUser(data:any): Promise<void>;
}


export interface ICourseSubscriber extends Pick<ISubscriber, "addUser">{}


export const createSubscriber = (): ICourseSubscriber => {
    return {
        addUser: addUserConsumer
    }
}