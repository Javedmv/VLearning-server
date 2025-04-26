import { IRepositories } from "./IRepositories";
import { IUseCases } from "./IUseCases";

// Basic interface for socket operations needed
export interface ISocketService {
    emitToRoom(roomId: string, event: string, data: any): void;
}

export interface IDependencies{
    repositories:IRepositories,
    useCases: IUseCases,
    socketService: ISocketService // Add socket service
}