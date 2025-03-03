import { createUser } from "../../services/createUser";

export default async (data:any) => {
    try {
        await createUser(data)
    } catch (error:any) {
        console.log("send-verification-mail-consumed error: ", error?.message);
    }
}