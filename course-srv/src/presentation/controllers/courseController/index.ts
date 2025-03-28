import { IDependencies } from "../../../application/interfaces/IDependencies";
import { addCourseController } from "./addCourseController";
import { generateCertificateController } from "./generateCertificateController";
import { getAllCoursesController } from "./getAllCoursesController";
import { getAllCoursesInstructorController } from "./getAllCoursesInstructorController";
import { getAllInstructorCoursesContorller } from "./getAllInstructorCoursesContorller";
import { getCourseDetailMyLearning } from "./getCourseDetailMyLearning";
import { getCourseDetailsController } from "./getCourseDetailsController";
import { getInstructorDashboardController } from "./getInstructorDashboardController";
import { getInstructorDetailsController } from "./getInstructorDetailsController";
import { getMyLearningController } from "./getMyLearningController";
import { postEnrollUserController } from "./postEnrollUserController";
import { postupdatedWatched } from "./postupdatedWatched";
import { putEditCourseController } from "./putEditCourseController";
import { streamVideo } from "./streamVideo";

export const courseControllers = (dependencies:IDependencies) => {
    return {
        addCourse : addCourseController(dependencies),
        getAllCourses: getAllCoursesController(dependencies),
        getAllInstructorCourses: getAllInstructorCoursesContorller(dependencies),
        getCourseDetails: getCourseDetailsController(dependencies),
        postEnrollUser: postEnrollUserController(dependencies),
        getInstructorDetails: getInstructorDetailsController(dependencies),
        getAllCoursesInstructor: getAllCoursesInstructorController(dependencies),
        editCourse: putEditCourseController(dependencies),
        getMyLearning: getMyLearningController(dependencies),
        courseDetailsMyLearning: getCourseDetailMyLearning(dependencies),
        updatedWatched: postupdatedWatched(dependencies),
        getInstructorDashboard: getInstructorDashboardController(dependencies),
        stream: streamVideo(dependencies),
        generateCertificate: generateCertificateController(dependencies)
    }
}
