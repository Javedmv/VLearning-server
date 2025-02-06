import { IEnrollStudentInCourseUseCase, ISavePaymentDBUseCase, IUserAndCourseDetailsUseCase } from "../../domain/useCases";
import { IDependencies } from "./IDependencies";

export interface IUseCases {
    userAndCourseDetailsUseCase:(dependencies:IDependencies) => IUserAndCourseDetailsUseCase;
    savePaymentDBUseCase:(dependencies:IDependencies) => ISavePaymentDBUseCase;
    enrollStudentInCourseUseCase:(dependencies:IDependencies) => IEnrollStudentInCourseUseCase;
}