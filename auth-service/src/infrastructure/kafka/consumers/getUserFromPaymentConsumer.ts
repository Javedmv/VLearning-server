import { getUserDetailsForPayment } from "../../services/getUserDetailsForPayment";

export default async (userId:string) => {
    try {
        await getUserDetailsForPayment(userId);
    } catch (error:any) {
        console.log("get user details for payment -consumed error: ", error?.message);
    }   
}