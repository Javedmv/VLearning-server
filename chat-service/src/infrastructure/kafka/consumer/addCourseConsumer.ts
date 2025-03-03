import { createCourse } from "../../services/createCourse";

export default async (data:any) => {
    try {
        await createCourse(data);
    } catch (error:any) {
        console.log("add course consumer in payment ERROR,:",error?.message)
    }
}