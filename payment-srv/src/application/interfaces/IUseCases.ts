import { IEnrollStudentInCourseUseCase, ISavePaymentDBUseCase, IupdatePaymentIntentSucceededUseCase,
    IUserAndCourseDetailsUseCase, IupdatePaymentIntentFailedUseCase } from "../../domain/useCases";
import { IGetPaymentHistoryUseCase } from "../../domain/useCases/IGetPaymentHistoryUseCase";
import { IDependencies } from "./IDependencies";

export interface IUseCases {
    userAndCourseDetailsUseCase:(dependencies:IDependencies) => IUserAndCourseDetailsUseCase;
    savePaymentDBUseCase:(dependencies:IDependencies) => ISavePaymentDBUseCase;
    enrollStudentInCourseUseCase:(dependencies:IDependencies) => IEnrollStudentInCourseUseCase;
    updatePaymentIntentSucceededUseCase:(dependencies:IDependencies) => IupdatePaymentIntentSucceededUseCase;
    updatePaymentIntentFailedUseCase:(dependencies:IDependencies) => IupdatePaymentIntentFailedUseCase;
    getPaymentHistoryUseCase:(dependencies:IDependencies) => IGetPaymentHistoryUseCase;
}