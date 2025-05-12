import { sendEnrollPaidUserProducer } from "../../infrastructure/kafka/producers";
import { IDependencies } from "../interfaces/IDependencies";

export const enrollStudentInCourseUseCase = (dependencies: IDependencies) => {
    const {repositories:{enrollStudentInCourse}} = dependencies
    return {
        execute: async (userId: string, courseId: string) => {
            try {
                const response = await enrollStudentInCourse(userId,courseId)
                console.log("Enrolling student in course.... usecase", userId, courseId, 'and getting response :',response);
                if(response){
                    await sendEnrollPaidUserProducer(userId,courseId,"course-srv-topic");
                    await sendEnrollPaidUserProducer(userId,courseId,"chat-srv-topic");
                }
                console.log(`✅ User ${userId} enrolled in course ${courseId} successfully. enrollStudentInCourse usecase`);
                return;
            } catch (error) {
                console.error("Error enrolling student:", error);
            }
        }
    };
};
