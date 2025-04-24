import { PTobe } from "../../../../_lib/constants/Tobe";
import { CourseModel } from "../models";
import { addNewCourse } from "./addNewCourse";
import mongoose from "mongoose";

export const editExsistingCourse = async (data:PTobe) => {
    try {
        await CourseModel.findByIdAndUpdate(data._id, data, { new: true, runValidators: true })
        .then(() => console.log("Course updated successfully in payment service"))

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message, "Error in updating Edit course in payment service");
        } else {
            console.error("Unknown error occurred in updating Edit course in payment service");
        }
    }
    
}