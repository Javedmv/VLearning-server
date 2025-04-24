import { ITOBE } from "../../../_lib/constants";
import { enrollStudentUser } from "../../databases/mongoDB/repositories/enrollStudentUser";

export default async (data: ITOBE) => {
    try {
        const enrolmentData = data;
        await enrollStudentUser(enrolmentData)
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("enroll student user consumer in payment error:", error.message);
        } else {
            console.log("enroll student user consumer in payment error: An unknown error occurred", error);
        }
    }
    
}