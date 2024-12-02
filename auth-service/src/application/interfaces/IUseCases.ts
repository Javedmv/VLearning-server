import { ICreateUserUseCase, IFindUserByEmailUseCase, IFindUserByIdUseCase, ILoginUserUseCase, IVerifyOtpUseCase, IFormSubmitByEmailUseCase } from "../../domain/useCases";
import { IDependencies } from "./IDependencies";

export interface IUseCases {
    createUserUseCase: (dependencies: IDependencies) => ICreateUserUseCase;
    findUserByEmailUseCase: (dependencies: IDependencies) => IFindUserByEmailUseCase;
    verifyOtpUseCase: (dependencies: IDependencies) => IVerifyOtpUseCase;
    loginUserUseCase: (dependencies: IDependencies) => ILoginUserUseCase;
    findUserByIdUseCase: (dependencies:IDependencies) => IFindUserByIdUseCase;
    formSubmitByEmailUseCase: (dependencies:IDependencies) => IFormSubmitByEmailUseCase;
}