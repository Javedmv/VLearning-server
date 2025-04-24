import { ITOBE } from "../../_lib/constants";
import {addNewUser} from "../databases/mongoDB/repositories/addNewUser";

export const createUser = async (data:ITOBE) => {
    try {
        await addNewUser(data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("ERROR IN KAFKA SERVICES:", error.message);
        } else {
            console.log("ERROR IN KAFKA SERVICES: An unknown error occurred", error);
        }
    }
    
}