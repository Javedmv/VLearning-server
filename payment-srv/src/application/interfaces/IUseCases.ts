import { ICreatePaymentSessionUseCase, IUserAndCourseDetailsUseCase } from "../../domain/useCases";
import { IDependencies } from "./IDependencies";

export interface IUseCases {
    userAndCourseDetailsUseCase:(dependencies:IDependencies) => IUserAndCourseDetailsUseCase;
    createPaymentSessionUseCase:(dependencies:IDependencies) => ICreatePaymentSessionUseCase;
}