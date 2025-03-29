import { CourseModel } from "../models/courseSchema";

export const getLandingPageCourses = async () => {
    try {
        // Populate the instructorId field to get instructor details
        return await CourseModel.find({})
            .populate({
                path: "instructor",
                select: "username firstName lastName profile"
            })
            .lean();
    } catch (error) {
        throw new Error("Error in getLandingPageCourses repo");
    }
}