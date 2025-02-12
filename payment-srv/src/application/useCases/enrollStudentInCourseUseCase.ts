import { sendEnrollPaidUserProducer } from "../../infrastructure/kafka/producers";
import { IDependencies } from "../interfaces/IDependencies";

export const enrollStudentInCourseUseCase = (dependencies: IDependencies) => {
    const {repositories:{enrollStudentInCourse}} = dependencies
    return {
        execute: async (userId: string, courseId: string) => {
            try {
                const response = await enrollStudentInCourse(userId,courseId)
                if(response){
                    console.log("PRODUCER:- paid send to enroll in course srv")
                    await sendEnrollPaidUserProducer(userId,courseId,"course-srv-topic");
                }
                return;
            } catch (error) {
                console.error("Error enrolling student:", error);
            }
        }
    };
};
