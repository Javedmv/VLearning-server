import { verifyAdmin } from "../../_lib/jwt";
import { jwtMiddleware } from "../../_lib/middlewares/jwtMiddleware";
import { uploadMiddleware } from "../../_lib/multer/multerConfig";
import {IDependencies} from "../../application/interfaces/IDependencies"
import { Router } from "express"
import {controllers} from "../../presentation/controllers"

export const routes = (dependencies:IDependencies) => {
    const { addCategory,getCategory } = controllers(dependencies);

    const router = Router();

    router.route("/multipart/add-category").post(uploadMiddleware,addCategory)
    router.route("/all-category").get(jwtMiddleware,verifyAdmin, getCategory)

    return router;
}