import { PTobe } from "../../_lib/constants/Tobe";
import { addNewUser } from "../databases/mongoDb/repositories/addNewUser";

export const createUser = async (data:PTobe) => {
    try {
        await addNewUser(data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("ERROR IN KAFKA SERVICES: ", error.message);
        } else {
            console.log("An unknown error occurred in Kafka services.");
        }
    }
    
}