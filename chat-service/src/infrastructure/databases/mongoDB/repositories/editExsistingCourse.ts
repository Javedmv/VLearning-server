import { ITOBE } from "../../../../_lib/constants";
import { CourseModel } from "../models";
import { addNewCourse } from "./addNewCourse";
import mongoose from "mongoose";

export const editExsistingCourse = async (data:ITOBE) => {
    try {
        await CourseModel.findByIdAndUpdate(data._id, data, { new: true, runValidators: true })
        .then(() => console.log("Course updated successfully in chat service"))

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error in updating Edit course in chat service:", error.message);
        } else {
            console.error("Unknown error in updating Edit course in chat service:", error);
        }
    }
    
}