import { editExsistingCourse } from "../databases/mongoDb/repositories/editExsistingCourse";

export const editCourse = async (data: any) => {
    try {
        await editExsistingCourse(data);
    } catch (error: any) {
        console.log("edit user consumer in payment error: ", error?.message);
    }
}