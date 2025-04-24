import { TOBE } from "../../_lib/common/Tobe";
import { addNewUser } from "../databases/mongoDb/repositories";

export const createUser = async (data:TOBE) => {
    try {
        await addNewUser(data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("ERROR IN KAFKA SERVICES : ", error.message);
        } else {
            console.log("ERROR IN KAFKA SERVICES : An unknown error occurred");
        }
    }
    
}