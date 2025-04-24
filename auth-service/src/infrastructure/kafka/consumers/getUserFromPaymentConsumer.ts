import { getUserDetailsForPayment } from "../../services/getUserDetailsForPayment";

export default async (userId:string) => {
    try {
        await getUserDetailsForPayment(userId);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("get user details for payment - consumed error:", error.message);
        } else {
            console.log("get user details for payment - consumed error:", error);
        }
    }
    
}