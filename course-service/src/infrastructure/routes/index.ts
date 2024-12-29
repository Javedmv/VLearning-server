import { verifyAdmin } from "../../_lib/jwt";
import { jwtMiddleware } from "../../_lib/middlewares/jwtMiddleware";
import { uploadMiddleware } from "../../_lib/multer/multerConfig";
import {IDependencies} from "../../application/interfaces/IDependencies"
import { Router } from "express"
import { categoryControllers } from "../../presentation/controllers/categoryControllers";
import { courseControllers } from "../../presentation/controllers/courseControllers";

export const courseRoutes = (dependencies:IDependencies) => {
    const { addCategory } = categoryControllers(dependencies);
    const { } = courseControllers(dependencies);

    const router = Router();

    router.route("/multipart/add-category").post(uploadMiddleware,addCategory)

    return router;
}