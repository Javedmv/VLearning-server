import { verifyAdmin, verifyUser } from "../../_lib/jwt";
import { jwtMiddleware } from "../../_lib/middlewares/jwtMiddleware";
import { uploadMiddleware } from "../../_lib/multer/multerConfig";
import {IDependencies} from "../../application/interfaces/IDependencies"
import { Router } from "express"
import {categoryControllers} from "../../presentation/controllers/categoryController"
import { courseControllers } from "../../presentation/controllers/courseController";

export const routes = (dependencies:IDependencies) => {
    const { addCategory,getCategory,updateCategory,updateCategoryStatus ,deleteCategory,getTrueCategory } = categoryControllers(dependencies);

    const { addCourse,getAllCourses,getAllInstructorCourses,getCourseDetails,postEnrollUser,
         getInstructorDetails, getAllCoursesInstructor, editCourse, getMyLearning,courseDetailsMyLearning,
         updatedWatched, getInstructorDashboard,stream ,generateCertificate} = courseControllers(dependencies);

    const router = Router();

    // CATEGORY CONTORLLERS

    // admin
    router.route("/multipart/add-category").post(uploadMiddleware,addCategory);
    router.route("/all-category").get(jwtMiddleware,verifyAdmin, getCategory);
    router.route("/multipart/update-category/:catId").post(uploadMiddleware,jwtMiddleware,verifyAdmin, updateCategory);
    router.route("/update-category-status/:catId").patch(jwtMiddleware,verifyAdmin,updateCategoryStatus)
    router.route("/delete-category/:catId").delete(jwtMiddleware,verifyAdmin, deleteCategory)

    //users
    router.route("/get-category-status-true").get(getTrueCategory);

    // COURSE CONTROLLERS
    router.route("/add-course").post(jwtMiddleware,verifyUser,addCourse)
    router.route("/all-courses").get(getAllCourses)
    router.route("/all-instructor-courses/:id").get(jwtMiddleware,verifyUser,getAllInstructorCourses)
    router.route("/details/:id").get(jwtMiddleware,verifyUser,getCourseDetails)

    router.route("/enroll-user").post(jwtMiddleware,verifyUser,postEnrollUser)

    router.route("/instructor-details/:id").get(getInstructorDetails);
    router.route("/all-course-insructor/:id").get(getAllCoursesInstructor);
    router.route("/edit-course/:id").put(jwtMiddleware,verifyUser,editCourse)
    
    router.route("/my-learning").get(jwtMiddleware,verifyUser,getMyLearning)
    router.route("/my-learning/course-detail/:enrollmentId").get(jwtMiddleware,verifyUser,courseDetailsMyLearning)
    router.route("/progress/:enrollmentId/complete-lesson").post(jwtMiddleware,verifyUser,updatedWatched)

    router.route("/instructor-dashboard").get(jwtMiddleware,verifyUser,getInstructorDashboard)

    router.get('/stream/:lessonId', jwtMiddleware, stream);
    router.get('/generate-certificate/:id', jwtMiddleware, generateCertificate);

    return router;
}