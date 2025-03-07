import { IgetChatGroupUseCase, IgetAllMessagesUseCase } from '../../domain/useCases';
import { IDependencies } from './IDependencies';

export interface IUseCases {
    getChatGroupUseCase: (dependencies:IDependencies) => IgetChatGroupUseCase
    getAllMessagesUseCase: (dependencies:IDependencies) => IgetAllMessagesUseCase
}