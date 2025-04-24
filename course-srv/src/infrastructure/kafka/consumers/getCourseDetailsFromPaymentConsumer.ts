import { sendCourseDetails } from "../../services/getCourseDetails";

export default async (courseId:string) => {
    try {
        await sendCourseDetails(courseId);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("send-verification-mail-consumed error: ", error.message);
        } else {
            console.log("send-verification-mail-consumed error: An unknown error occurred");
        }
    }
    
}