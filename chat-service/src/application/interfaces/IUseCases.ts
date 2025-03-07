import { IgetChatGroupUseCase } from '../../domain/useCases';
import { IDependencies } from './IDependencies';

export interface IUseCases {
    getChatGroupUseCase: (dependencies:IDependencies) => IgetChatGroupUseCase
}