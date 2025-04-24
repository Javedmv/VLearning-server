import { TOBE } from "../../../_lib/common/Tobe";
import { createUser } from "../../services/createUser";

export default async (data:TOBE) => {
    try {
        await createUser(data)
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("send-verification-mail-consumed error: ", error.message);
        } else {
            console.log("send-verification-mail-consumed error: An unknown error occurred");
        }
    }
    
}