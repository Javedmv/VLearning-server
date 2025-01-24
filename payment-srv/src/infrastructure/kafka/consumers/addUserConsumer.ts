import { createUser } from "../../services/createUser";

export default async (data:any) => {
    try {
        await createUser(data)
    } catch (error:any) {
        console.log("add user consumer in payment error: ", error?.message);
    }
}