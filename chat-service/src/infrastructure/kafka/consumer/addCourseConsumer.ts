import { ITOBE } from "../../../_lib/constants";
import { createCourse } from "../../services/createCourse";

export default async (data:ITOBE) => {
    try {
        await createCourse(data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("add course consumer in payment ERROR:", error.message);
        } else {
            console.log("add course consumer in payment ERROR: An unknown error occurred", error);
        }
    }    
}