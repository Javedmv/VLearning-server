import { enrollStudentUser } from "../../databases/mongoDB/repositories/enrollStudentUser";

export default async (data: any) => {
    try {
        const enrolmentData = data;
        await enrollStudentUser(enrolmentData)
    } catch (error:any) {
        console.log("enroll student user consumer in payment error: ", error?.message);
    }
}