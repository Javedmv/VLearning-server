import { UserEntity } from "../../domain/entities"
import getUser from "../database/mongoDB/repositories/getUser"
// import sendUserDetailsProducer from "../kafka/producers/sendUserDetailsProducer"
// import sendUserDetailsProducer

export const getUserDetails = async (userId:string) => {
    try {
        const userDetails = await getUser(userId)
        console.log(userDetails,"in auth service")
        // await sendUserDetailsProducer(userDetails,"course-service-topic")

    } catch (error:any) {
        console.log(error?.message)
    }
}