import { ITOBE } from "../../../_lib/constants";
import { editCourse } from "../../services/editCourse";

export default async (data:ITOBE) => {
    try {
        await editCourse(data)
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("edit user consumer in chat error:", error.message);
        } else {
            console.log("edit user consumer in chat error: An unknown error occurred", error);
        }
    }
    
}