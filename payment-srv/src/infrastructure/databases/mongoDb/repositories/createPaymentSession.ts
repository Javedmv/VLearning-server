import { User, CourseModel } from "../models"; // Assuming these are your Mongoose models

export const createPaymentSession = async (sessionId:string,courseId: string,userId: string): Promise<any> => {
    try {
        console.log(sessionId,courseId,userId)
        console.log("hello from the repo of the create payment session")
    } catch (error: any) {
        console.error(error.message, "Error in fetching user and course details");
    }
};
