import { CourseModel } from "../models/courseSchema";

export const getAllCoursesInstructor = async (instructorId: string) => {
  try {
    const courses = await CourseModel.find({ instructorId }).populate('basicDetails.category')

    if (!courses || courses.length === 0) {
      console.log("No courses found for the instructor.");
      return Promise.resolve(null);
    }

    return courses;
  } catch (error) {
    console.error(error, "error in get all courses repo");
    return Promise.resolve(null); // Return a resolved promise with null in case of an error
  }
};
