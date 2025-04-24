import { ITOBE } from "../../_lib/constants";
import { editExsistingCourse } from "../databases/mongoDB/repositories/editExsistingCourse";

export const editCourse = async (data: ITOBE) => {
    try {
        await editExsistingCourse(data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("edit user consumer in chat error:", error.message);
        } else {
            console.log("edit user consumer in chat error: An unknown error occurred", error);
        }
    }
    
}