import { PTobe } from "../../../_lib/constants/Tobe";
import { enrollStudentUser } from "../../databases/mongoDb/repositories/enrollStudentUser";

export default async (data:PTobe) => {
    try {
        const {courseId, userId} = data;
        console.log(courseId,userId, "courseid and userid here is the details.")
        await enrollStudentUser(courseId,userId)
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("enroll student user consumer in payment error: ", error.message);
        } else {
            console.log("Unknown error occurred in enroll student user consumer in payment");
        }
    }
    
}