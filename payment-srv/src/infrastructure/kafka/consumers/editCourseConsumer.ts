import { PTobe } from "../../../_lib/constants/Tobe";
import { editCourse } from "../../services/editCourse";

export default async (data:PTobe) => {
    try {
        await editCourse(data)
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("edit user consumer in payment error: ", error.message);
        } else {
            console.log("Unknown error occurred in edit user consumer in payment");
        }
    }
    
}