import { PTobe } from "../../../_lib/constants/Tobe";
import { createUser } from "../../services/createUser";

export default async (data:PTobe) => {
    try {
        await createUser(data)
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("add user consumer in payment error: ", error.message);
        } else {
            console.log("Unknown error occurred in add user consumer in payment");
        }
    }    
}