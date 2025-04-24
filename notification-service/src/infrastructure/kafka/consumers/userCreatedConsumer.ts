import { sendVerificationMail } from "../../services";

export default async (data: string) => {
    try {
        await sendVerificationMail(data)
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("user-created-consumed mail send error: ", error.message);
        } else {
            console.log("user-created-consumed mail send error: An unknown error occurred");
        }
    }
    
}