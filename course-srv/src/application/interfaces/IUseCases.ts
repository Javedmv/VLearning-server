import {IAddCategoryUseCase, IGetAllCategoryUseCase, IUpdateCategoryUseCase, IUpdateCategoryStatusUseCase, IDeleteCategoryUseCase, IGetActiveCategoryUseCase} from "../../domain/useCases";

import { IDependencies } from "./IDependencies";

export interface IUseCases {
    addCategoryUseCase: (dependencies:IDependencies) => IAddCategoryUseCase;
    getAllCategoryUseCase : (dependencies:IDependencies) => IGetAllCategoryUseCase;
    updateCategoryUseCase : (dependencies:IDependencies) => IUpdateCategoryUseCase;
    updateCategoryStatusUseCase : (dependencies:IDependencies) => IUpdateCategoryStatusUseCase;
    deleteCategoryUseCase: (dependencies:IDependencies) => IDeleteCategoryUseCase;
    getActiveCategoryUseCase: (dependencies:IDependencies) => IGetActiveCategoryUseCase;
}