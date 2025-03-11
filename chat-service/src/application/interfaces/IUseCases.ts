import { IgetChatGroupUseCase, IgetAllMessagesUseCase, IaddNewMessageUseCase, IgetAllInstructorChatsUseCase } from '../../domain/useCases';
import { IDependencies } from './IDependencies';

export interface IUseCases {
    getChatGroupUseCase: (dependencies:IDependencies) => IgetChatGroupUseCase
    getAllMessagesUseCase: (dependencies:IDependencies) => IgetAllMessagesUseCase
    addNewMessageUseCase: (dependencies:IDependencies) => IaddNewMessageUseCase
    getAllInstructorChatsUseCase: (dependencies:IDependencies) => IgetAllInstructorChatsUseCase
}