import {IAddCategoryUseCase, IGetAllCategoryUseCase, IUpdateCategoryUseCase, IUpdateCategoryStatusUseCase, IDeleteCategoryUseCase, IGetActiveCategoryUseCase, IAddCourseUseCase, IGetAllCoursesUseCase, IGetAllInstructorCoursesUseCase, IEnrollUserUseCase, IGetAllCoursesInstructorUseCase} from "../../domain/useCases";

import { IDependencies } from "./IDependencies";
import { IGetCourseDetailUseCase } from '../../domain/useCases/IGetCourseDetailUseCase';
import { IGetInstructorDetailsUseCase } from '../../domain/useCases/IGetInstructorDetailsUseCase';

export interface IUseCases {
    addCategoryUseCase: (dependencies:IDependencies) => IAddCategoryUseCase;
    getAllCategoryUseCase : (dependencies:IDependencies) => IGetAllCategoryUseCase;
    updateCategoryUseCase : (dependencies:IDependencies) => IUpdateCategoryUseCase;
    updateCategoryStatusUseCase : (dependencies:IDependencies) => IUpdateCategoryStatusUseCase;
    deleteCategoryUseCase: (dependencies:IDependencies) => IDeleteCategoryUseCase;
    getActiveCategoryUseCase: (dependencies:IDependencies) => IGetActiveCategoryUseCase;
    
    addCourseUseCase: (dependencies:IDependencies) => IAddCourseUseCase;
    getAllCoursesUseCase: (dependencies:IDependencies) => IGetAllCoursesUseCase;
    getAllInstructorCoursesUseCase: (dependencies:IDependencies) => IGetAllInstructorCoursesUseCase;
    getCourseDetailUseCase: (dependencies:IDependencies) => IGetCourseDetailUseCase;
    enrollUserUseCase: (dependencies:IDependencies) => IEnrollUserUseCase;
    getInstructorDetailsUseCase: (dependencies:IDependencies) => IGetInstructorDetailsUseCase;
    getAllCoursesInstructorUseCase: (dependencies:IDependencies) => IGetAllCoursesInstructorUseCase;
}