import { IDependencies } from "../application/interfaces/IDependencies";
import * as repositories from "../infrastructure/databases/mongoDB/repositories";

// Import individual use case builders
import {
    buildStartStreamUseCase, // Assuming the builder is exported with this name
    buildGetStreamDetailsUseCase, // Assuming name
    buildStopStreamUseCase, // Assuming name
    // --- Import other existing use case builders similarly --- 
    getChatGroupUseCase, // Example: Assuming existing builders follow a pattern
    getAllMessagesUseCase,
    addNewMessageUseCase,
    getAllInstructorChatsUseCase,
    adminGetAllDashboardDataUseCase,
    adminGetPopularCoursesUseCase,
    adminGetEnrollmentDataUseCase
} from "../application/useCases"; 

// Import the IUseCases interface to ensure type safety
import { IUseCases } from "../application/interfaces/IUseCases";

// Construct the useCases object matching the IUseCases interface
const useCases: IUseCases = {
    // Map interface keys to the imported builder functions
    startStreamUseCase: buildStartStreamUseCase,
    getStreamDetailsUseCase: buildGetStreamDetailsUseCase,
    stopStreamUseCase: buildStopStreamUseCase,
    // --- Map other existing use cases --- 
    getChatGroupUseCase: getChatGroupUseCase, 
    getAllMessagesUseCase: getAllMessagesUseCase,
    addNewMessageUseCase: addNewMessageUseCase,
    getAllInstructorChatsUseCase: getAllInstructorChatsUseCase,
    adminGetAllDashboardDataUseCase: adminGetAllDashboardDataUseCase,
    adminGetPopularCoursesUseCase: adminGetPopularCoursesUseCase,
    adminGetEnrollmentDataUseCase: adminGetEnrollmentDataUseCase
};

export const dependencies: Pick<IDependencies, 'repositories' | 'useCases'> = { // Assuming IDependencies might have more later (like socketService)
    repositories,
    useCases
};