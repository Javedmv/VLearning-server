import { ITOBE } from "../../_lib/constants";
import { addNewCourse } from "../databases/mongoDB/repositories/addNewCourse"

export const createCourse = async (data: ITOBE) => {
    try {
        await addNewCourse(data)
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("ERROR IN KAFKA SERVICES:", error.message);
        } else {
            console.log("ERROR IN KAFKA SERVICES: An unknown error occurred", error);
        }
    }
    
}