import { CourseModel } from "../models";

export const adminGetPopularCourses = async () => {
    try {
        const courses = await CourseModel.find({})
            .sort({ "students.length": -1 })
            .limit(3)
            .select("instructor basicDetails students pricing")
            .populate({ path: "instructor", select: "username" })
        return courses;
    } catch (error) {
        throw new Error("Error getting popular courses");
    }
}