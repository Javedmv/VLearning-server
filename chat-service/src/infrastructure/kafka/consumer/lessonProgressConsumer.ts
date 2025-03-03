import { updateEnrollmentData } from "../../databases/mongoDB/repositories/updateEnrollmentData";

export default async (data: any) => {
    try {
        const enrolmentData = data;
        await updateEnrollmentData(enrolmentData)
    } catch (error:any) {
        console.log("enroll student user consumer in payment error: ", error?.message);
    }
}