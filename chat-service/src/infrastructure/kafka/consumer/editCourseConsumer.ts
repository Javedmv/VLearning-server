import { editCourse } from "../../services/editCourse";

export default async (data:any) => {
    try {
        await editCourse(data)
    } catch (error:any) {
        console.log("edit user consumer in chat error: ", error?.message);
    }
}