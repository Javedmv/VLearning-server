import { PTobe } from "../../_lib/constants/Tobe";
import { editExsistingCourse } from "../databases/mongoDb/repositories/editExsistingCourse";

export const editCourse = async (data: PTobe) => {
    try {
        await editExsistingCourse(data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("edit user consumer in payment error: ", error.message);
        } else {
            console.log("An unknown error occurred while editing user consumer in payment.");
        }
    }
    
}