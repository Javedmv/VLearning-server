import { addCategoryController } from "./addCategoryController"
import { IDependencies } from "../../../application/interfaces/IDependencies"

export const categoryControllers = (dependencies:IDependencies) => {
    return {
        addCategory: addCategoryController(dependencies),
    }
}