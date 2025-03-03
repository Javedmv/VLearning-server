import { addNewCourse } from "../databases/mongoDB/repositories/addNewCourse"

export const createCourse = async (data:any) => {
    try {
        await addNewCourse(data)
    } catch (error:any) {
        console.log("ERROR IN KAFKA SERVICES : ",error?.message)
    }
}