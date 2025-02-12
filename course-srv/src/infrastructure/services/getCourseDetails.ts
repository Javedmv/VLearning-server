import { sendCourseDetailsProducer } from "../kafka/producers";
import { getCourseDetails } from "../databases/mongoDb/repositories";
import { getOneCourse } from "../databases/mongoDb/repositories/getOneCourse";

export const sendCourseDetails = async (courseId:string) => {
    try {
        const courseDetails = await getOneCourse(courseId);
        console.log(courseDetails,"in the courseService send to payment service ------------------");
        await sendCourseDetailsProducer(courseDetails,"payment-srv-topic")
    } catch (error:any) {
        console.log("ERROR IN GET COURSE DEATILS SERVICES : ",error?.message)
    }
}