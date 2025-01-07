import { addCategoryController } from './addCategoryContoller';
import {getAllCategoryController} from "./getAllCategoryController"
import { IDependencies } from '../../../application/interfaces/IDependencies';
import { updateCategoryController } from './updateCategoryController';
import { updateCategoryStatusController } from './updateCategoryStatusController';
import { deleteCategoryController } from './deleteCategoryController';


export const categoryControllers = (dependencies: IDependencies) =>  {
    return {
        addCategory: addCategoryController(dependencies),
        getCategory: getAllCategoryController(dependencies),
        updateCategory: updateCategoryController(dependencies),
        updateCategoryStatus: updateCategoryStatusController(dependencies),
        deleteCategory: deleteCategoryController(dependencies)
    }
}