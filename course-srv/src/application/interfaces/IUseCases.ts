import {IAddCategoryUseCase, IGetAllCategoryUseCase, IUpdateCategoryUseCase, IUpdateCategoryStatusUseCase,
     IDeleteCategoryUseCase, IGetActiveCategoryUseCase, IAddCourseUseCase, IGetAllCoursesUseCase,
     IGetAllInstructorCoursesUseCase, IEnrollUserUseCase, IGetAllCoursesInstructorUseCase,
     IEditCourseUseCase, IGetCourseDetailUseCase, IGetInstructorDetailsUseCase, getMyLearningUseCase,
     ICourseDetailMyLearningUseCase,
     IUpdateProgressUseCase,
     IgetInstructorDashboardUseCase,
     IgetLandingPageCoursesUseCase,
     IgetLandingPageInstructorsUseCase
     } from "../../domain/useCases";
import { IgetEnrollmentUseCase } from "../../domain/useCases/IgetEnrollmentUseCase";

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
    getAllInstructorCoursesUseCase: (dependencies:IDependencies) => IGetAllInstructorCoursesUseCase;
    getCourseDetailUseCase: (dependencies:IDependencies) => IGetCourseDetailUseCase;
    enrollUserUseCase: (dependencies:IDependencies) => IEnrollUserUseCase;
    getInstructorDetailsUseCase: (dependencies:IDependencies) => IGetInstructorDetailsUseCase;
    getAllCoursesInstructorUseCase: (dependencies:IDependencies) => IGetAllCoursesInstructorUseCase;
    editCourseUseCase: (dependencies:IDependencies) => IEditCourseUseCase;

    getMyLearningUseCase:(dependencies:IDependencies) => getMyLearningUseCase;
    courseDetailMyLearningUseCase:(dependencies:IDependencies) => ICourseDetailMyLearningUseCase;
    updateProgressUseCase:(dependencies:IDependencies) => IUpdateProgressUseCase;

    getInstructorDashboardUseCase: (dependencies:IDependencies) => IgetInstructorDashboardUseCase;
    getEnrollmentUseCase: (dependencies:IDependencies) => IgetEnrollmentUseCase;

    getLandingPageCoursesUseCase: (dependencies:IDependencies) => IgetLandingPageCoursesUseCase;
    getLandingPageInstructorsUseCase: (dependencies:IDependencies) => IgetLandingPageInstructorsUseCase;
}