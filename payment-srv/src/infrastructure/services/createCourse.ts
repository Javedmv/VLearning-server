import { PTobe } from "../../_lib/constants/Tobe";
import { addNewCourse } from "../databases/mongoDb/repositories/addNewCourse"

export const createCourse = async (data:PTobe) => {
    try {
        await addNewCourse(data)
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("ERROR IN KAFKA SERVICES: ", error.message);
        } else {
            console.log("An unknown error occurred in Kafka services.");
        }
    }
    
}