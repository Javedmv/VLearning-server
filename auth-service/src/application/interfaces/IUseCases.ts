import { ICreateUserUseCase } from "../../domain/useCases";

export interface IUseCases {
    createUserUseCase: (dependencies: any) => ICreateUserUseCase;
}