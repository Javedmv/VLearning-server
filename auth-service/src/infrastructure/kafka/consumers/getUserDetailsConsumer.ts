import { getUserDetails } from "../../services/getUserDetails";

export default async (userId:string) => {
    try {
        await getUserDetails(userId);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("send-verification-mail-consumed error:", error.message);
        } else {
            console.log("send-verification-mail-consumed error:", error);
        }
    }
    
}