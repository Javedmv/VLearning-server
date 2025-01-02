import {IAddCategoryUseCase} from "../../domain/useCases";

import { IDependencies } from "./IDependencies";

export interface IUseCases {
    addCategoryUseCase: (dependencies:IDependencies) => IAddCategoryUseCase;
}