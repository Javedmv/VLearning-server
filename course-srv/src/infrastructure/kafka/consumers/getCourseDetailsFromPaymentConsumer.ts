import { sendCourseDetails } from "../../services/getCourseDetails";

export default async (courseId:string) => {
    try {
        await sendCourseDetails(courseId);
    } catch (error:any) {
        console.log("send-verification-mail-consumed error: ", error?.message);
    }
}