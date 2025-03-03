import { CourseModel } from "../models";
import { addNewCourse } from "./addNewCourse";
import mongoose from "mongoose";

export const editExsistingCourse = async (data:any) => {
    try {
        await CourseModel.findByIdAndUpdate(data._id, data, { new: true, runValidators: true })
        .then(() => console.log("Course updated successfully in chat service"))

    } catch (error:any) {
        console.error(error.message, "Error in updating Edit course in chat service");
    }
}