import {IAddCategoryUseCase, IGetAllCategoryUseCase, IUpdateCategoryUseCase, IUpdateCategoryStatusUseCase, IDeleteCategoryUseCase, IGetActiveCategoryUseCase, IAddCourseUseCase, IGetAllCoursesUseCase, IGetAllInstructorCoursesUseCase} from "../../domain/useCases";

import { IDependencies } from "./IDependencies";

export interface IUseCases {
    addCategoryUseCase: (dependencies:IDependencies) => IAddCategoryUseCase;
    getAllCategoryUseCase : (dependencies:IDependencies) => IGetAllCategoryUseCase;
    updateCategoryUseCase : (dependencies:IDependencies) => IUpdateCategoryUseCase;
    updateCategoryStatusUseCase : (dependencies:IDependencies) => IUpdateCategoryStatusUseCase;
    deleteCategoryUseCase: (dependencies:IDependencies) => IDeleteCategoryUseCase;
    getActiveCategoryUseCase: (dependencies:IDependencies) => IGetActiveCategoryUseCase;
    
    addCourseUseCase: (dependencies:IDependencies) => IAddCourseUseCase;
    getAllCoursesUseCase: (dependencies:IDependencies) => IGetAllCoursesUseCase;
    getAllInstructorCoursesUseCase: (dependencies:IDependencies) => IGetAllInstructorCoursesUseCase
}