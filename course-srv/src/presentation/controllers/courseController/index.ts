import { IDependencies } from "../../../application/interfaces/IDependencies";
import { addCourseController } from "./addCourseController";
import { getAllCoursesController } from "./getAllCoursesController";
import { getAllInstructorCoursesContorller } from "./getAllInstructorCoursesContorller";
import { getCourseDetailsController } from "./getCourseDetailsController";
import { postEnrollUserController } from "./postEnrollUserController";

export const courseControllers = (dependencies:IDependencies) => {
    return {
        addCourse : addCourseController(dependencies),
        getAllCourses: getAllCoursesController(dependencies),
        getAllInstructorCourses: getAllInstructorCoursesContorller(dependencies),
        getCourseDetails: getCourseDetailsController(dependencies),
        postEnrollUser: postEnrollUserController(dependencies),
    }
}
