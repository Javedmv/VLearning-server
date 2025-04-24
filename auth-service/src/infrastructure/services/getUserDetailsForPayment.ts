import { PAYMENT_SERVICE_TOPIC } from "../../_lib/common"
import getUser from "../database/mongoDB/repositories/getUser"
import { sendUserDetailsProducer } from "../kafka/producers"
// import sendUserDetailsProducer

export const getUserDetailsForPayment = async (userId:string) => {
    try {
        const userDetails = await getUser(userId)
        console.log(userDetails,"in auth service send to payment service -------------")
        await sendUserDetailsProducer(userDetails, PAYMENT_SERVICE_TOPIC);

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);
        } else {
            console.log("Unknown error:", error);
        }
    }
    
}