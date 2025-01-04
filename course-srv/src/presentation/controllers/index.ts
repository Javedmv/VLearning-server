import { addCategoryController } from './addCategoryContoller';
import {getAllCategoryController} from "./getAllCategoryController"
import { IDependencies } from '../../application/interfaces/IDependencies';
import { updateCategoryController } from './updateCategoryController';


export const controllers = (dependencies: IDependencies) =>  {
    return {
        addCategory: addCategoryController(dependencies),
        getCategory: getAllCategoryController(dependencies),
        updateCategory: updateCategoryController(dependencies),
    }
}