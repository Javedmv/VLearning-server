import { verifyAdmin, verifyUser } from "../../_lib/jwt";
import { jwtMiddleware } from "../../_lib/middlewares/jwtMiddleware";
import { uploadMiddleware } from "../../_lib/multer/multerConfig";
import {IDependencies} from "../../application/interfaces/IDependencies"
import { Router } from "express"
import {categoryControllers} from "../../presentation/controllers/categoryController"

export const routes = (dependencies:IDependencies) => {
    const { addCategory,getCategory,updateCategory,updateCategoryStatus ,deleteCategory,getTrueCategory } = categoryControllers(dependencies);

    const router = Router();
    // admin
    router.route("/multipart/add-category").post(uploadMiddleware,addCategory);
    router.route("/all-category").get(jwtMiddleware,verifyAdmin, getCategory);
    router.route("/multipart/update-category/:catId").post(uploadMiddleware,jwtMiddleware,verifyAdmin, updateCategory);
    router.route("/update-category-status/:catId").patch(jwtMiddleware,verifyAdmin,updateCategoryStatus)
    router.route("/delete-category/:catId").delete(jwtMiddleware,verifyAdmin, deleteCategory)

    //users
    router.route("/get-category-status-true").get(jwtMiddleware,verifyUser,getTrueCategory);

    return router;
}