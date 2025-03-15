import { IgetChatGroupUseCase, IgetAllMessagesUseCase, IaddNewMessageUseCase, IgetAllInstructorChatsUseCase,
    IadminGetAllDashboardDataUseCase, 
    IadminGetPopularCoursesUseCase, IadminGetEnrollmentDataUseCase} from '../../domain/useCases';
import { IDependencies } from './IDependencies';

export interface IUseCases {
    getChatGroupUseCase: (dependencies:IDependencies) => IgetChatGroupUseCase
    getAllMessagesUseCase: (dependencies:IDependencies) => IgetAllMessagesUseCase
    addNewMessageUseCase: (dependencies:IDependencies) => IaddNewMessageUseCase
    getAllInstructorChatsUseCase: (dependencies:IDependencies) => IgetAllInstructorChatsUseCase

    adminGetAllDashboardDataUseCase: (dependencies:IDependencies) => IadminGetAllDashboardDataUseCase
    adminGetPopularCoursesUseCase: (dependencies:IDependencies) => IadminGetPopularCoursesUseCase
    adminGetEnrollmentDataUseCase: (dependencies:IDependencies) => IadminGetEnrollmentDataUseCase

}