import { enrollStudentUser } from "../../databases/mongoDb/repositories/enrollStudentUser";

export default async (data: any) => {
    try {
        const {courseId, userId} = data;
        console.log(courseId,userId, "courseid and userid here is the details.")
        await enrollStudentUser(courseId,userId)
    } catch (error:any) {
        console.log("enroll student user consumer in payment error: ", error?.message);
    }
}