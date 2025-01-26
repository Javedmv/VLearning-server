import { IDependencies } from "../../../application/interfaces/IDependencies";
import { addCourseController } from "./addCourseController";
import { getAllCoursesController } from "./getAllCoursesController";
import { getAllCoursesInstructorController } from "./getAllCoursesInstructorController";
import { getAllInstructorCoursesContorller } from "./getAllInstructorCoursesContorller";
import { getCourseDetailsController } from "./getCourseDetailsController";
import { getInstructorDetailsController } from "./getInstructorDetailsController";
import { postEnrollUserController } from "./postEnrollUserController";

export const courseControllers = (dependencies:IDependencies) => {
    return {
        addCourse : addCourseController(dependencies),
        getAllCourses: getAllCoursesController(dependencies),
        getAllInstructorCourses: getAllInstructorCoursesContorller(dependencies),
        getCourseDetails: getCourseDetailsController(dependencies),
        postEnrollUser: postEnrollUserController(dependencies),
        getInstructorDetails: getInstructorDetailsController(dependencies),
        getAllCoursesInstructor: getAllCoursesInstructorController(dependencies),
    }
}
