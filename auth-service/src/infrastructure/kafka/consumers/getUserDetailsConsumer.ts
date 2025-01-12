import { getUserDetails } from "../../services/getUserDetails";

export default async (userId:string) => {
    try {
        await getUserDetails(userId);
    } catch (error:any) {
        console.log("send-verification-mail-consumed error: ", error?.message);
    }   
}