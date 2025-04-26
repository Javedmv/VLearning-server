import { Server as SocketIoServer } from 'socket.io';
import { ISocketService } from '../../application/interfaces/IDependencies';

export class SocketService implements ISocketService {
    private io: SocketIoServer;

    constructor(io: SocketIoServer) {
        if (!io) {
            throw new Error("Socket.IO server instance is required for SocketService.");
        }
        this.io = io;
        console.log("SocketService initialized");
    }

    emitToRoom(roomId: string, event: string, data: any): void {
        if (!roomId || !event) {
            console.error("Attempted to emit to room with invalid roomId or event:", { roomId, event });
            return;
        }
        // Log who is in the room right before emitting
        const roomMembers = this.io.sockets.adapter.rooms.get(roomId);
        console.log(`[SocketService] Emitting event '${event}' to room '${roomId}'. Members:`, roomMembers ? Array.from(roomMembers) : 'None', "Data:", data);
        this.io.to(roomId).emit(event, data);
    }

    // Add other socket-related methods here if needed in the future
} 