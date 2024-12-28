import { IDependencies } from "../../../application/interfaces/IDependencies";
import { addCategoryController } from "./addCategoryController";

export const categoryControllers = (dependencies:IDependencies) => {
    return {
        addCategory: addCategoryController(dependencies)
    }
}