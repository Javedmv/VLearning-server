import { ITOBE } from "../../../_lib/constants";
import { createUser } from "../../services/createUser";

export default async (data:ITOBE) => {
    try {
        await createUser(data)
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("send-verification-mail-consumed error:", error.message);
        } else {
            console.log("send-verification-mail-consumed error: An unknown error occurred", error);
        }
    }
    
}