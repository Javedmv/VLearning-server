import { ICreateUserUseCase, IFindUserByEmailUseCase, IFindUserByIdUseCase, ILoginUserUseCase, IVerifyOtpUseCase } from "../../domain/useCases";

export interface IUseCases {
    createUserUseCase: (dependencies: any) => ICreateUserUseCase;
    findUserByEmailUseCase: (dependencies: any) => IFindUserByEmailUseCase;
    verifyOtpUseCase: (dependencies: any) => IVerifyOtpUseCase;
    loginUserUseCase: (dependencies: any) => ILoginUserUseCase;
    findUserByIdUseCase: (dependencies:any) => IFindUserByIdUseCase
}