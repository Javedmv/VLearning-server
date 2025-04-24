import { PTobe } from "../../../_lib/constants/Tobe";
import { createCourse } from "../../services/createCourse";

export default async (data:PTobe) => {
    try {
        await createCourse(data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("add course consumer in payment ERROR:", error.message);
        } else {
            console.log("Unknown error occurred in add course consumer in payment");
        }
    }
    
}