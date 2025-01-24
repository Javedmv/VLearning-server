import { addNewUser } from "../databases/mongoDb/repositories/addNewUser";

export const createUser = async (data:any) => {
    try {
        await addNewUser(data);
    } catch (error:any) {
        console.log("ERROR IN KAFKA SERVICES : ",error?.message)
    }
}