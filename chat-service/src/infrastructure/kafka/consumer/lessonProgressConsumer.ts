import { ITOBE } from "../../../_lib/constants";
import { updateEnrollmentData } from "../../databases/mongoDB/repositories/updateEnrollmentData";

export default async (data: ITOBE) => {
    try {
        const enrolmentData = data;
        await updateEnrollmentData(enrolmentData)
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("enroll student user consumer in payment error:", error.message);
        } else {
            console.log("enroll student user consumer in payment error: An unknown error occurred", error);
        }
    }
    
}