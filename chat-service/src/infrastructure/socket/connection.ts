import { Server as SocketIoServer } from 'socket.io';
import dotenv from "dotenv";
import { Server as HttpServer } from 'http';
import { MessageModel } from "../databases/mongoDB/models";

// Define stream information interface
interface StreamInfo {
    chatId: string;
    streamerId: string;
    streamerName: string;
    viewers: string[];
}

const connectSocketIo = (server: HttpServer) => {
    const io = new SocketIoServer(server, {
        path: "/socket.io/",
        cors: {
            origin: process.env.CLIENT_URL,
            credentials: true  // Fixed: lowercase and plural
        },
        transports: ['polling', 'websocket']  // Support both transports
    });

    const userSocketMap: {[key: string]: string} = {};
    const activeRooms: {[key: string]: string[]} = {}; // Track users in each chat room
    const userRoles: {[key: string]: string} = {}; // Added to store user roles
    const activeStreams: Map<string, StreamInfo> = new Map(); // Track active streams

    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);
        const userId = socket.handshake.query.userId as string;

        if (userId !== "undefined") {
            userSocketMap[userId] = socket.id;
            console.log(`User ${userId} connected with socket ID ${socket.id}`);
            
            // Broadcast online users
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        }

        // Join a specific chat room
        socket.on("join", ({ chatId, userId }) => {
            if (!chatId) return;
            
            socket.join(chatId);
            console.log(`User ${userId} joined chat room ${chatId}`);
            
            // Track user in room
            if (!activeRooms[chatId]) {
                activeRooms[chatId] = [];
            }
            if (!activeRooms[chatId].includes(userId)) {
                activeRooms[chatId].push(userId);
            }
            
            // Notify room about new user
            socket.to(chatId).emit("userJoined", { 
                message: `User ${userId} joined the chat` 
            });
        });

        // Handle sending messages
        socket.on("sendMessage", async (message) => {
            console.log("Message received:", message);
            
            if (!message.chatId) return;
            
            try {
                // Save message and populate sender in one step
                const savedMessage = await (await MessageModel.create(message)).populate("sender");
                console.log("Saved message:", savedMessage);
                
                // Broadcast to everyone in the chat room including sender
                io.in(message.chatId).emit("message", savedMessage);
                
                // Send acknowledgment back to sender
                socket.emit("messageSent", { success: true, messageId: savedMessage._id });
            } catch (error) {
                console.error("Error handling message:", error);
                socket.emit("messageError", { error: "Failed to send message" });
            }
        });

        socket.on("typing", ({ chatId, userId, username }) => {
            if (!chatId) return;
            console.log(`User ${username} is typing in chat room ${chatId}`);
            socket.to(chatId).emit("userTyping", { chatId, userId, username });
        });

        // Handle video call signaling
        socket.on("startVideoCall", ({ chatId, offer }) => {
            if (!chatId) return;
            console.log(`Video call started in chat room ${chatId}`);
            socket.to(chatId).emit("videoCallStarted");
            socket.to(chatId).emit("offer", { offer });
        });

        // Handle WebRTC signaling
        socket.on("joinVideoCall", ({ chatId, userId, username, role }) => {
            if (!chatId) return;
            console.log(`User ${userId} joined video call in chat ${chatId}`);
            
            // Add user to active rooms if not already there
            if (!activeRooms[chatId]) {
                activeRooms[chatId] = [];
            }
            if (!activeRooms[chatId].includes(userId)) {
                activeRooms[chatId].push(userId);
            }
            
            // Notify others in the room
            socket.to(chatId).emit("userJoinedCall", { chatId, userId, username, role });
        });

        socket.on("offer", ({ chatId, toUserId, fromUserId, offer }) => {
            console.log(`Forwarding offer from ${fromUserId} to ${toUserId}`);
            const targetSocketId = userSocketMap[toUserId];
            if (targetSocketId) {
                io.to(targetSocketId).emit("offer", { chatId, fromUserId, toUserId, offer });
            }
        });

        socket.on("answer", ({ chatId, toUserId, fromUserId, answer }) => {
            console.log(`Forwarding answer from ${fromUserId} to ${toUserId}`);
            const targetSocketId = userSocketMap[toUserId];
            if (targetSocketId) {
                io.to(targetSocketId).emit("answer", { chatId, fromUserId, toUserId, answer });
            }
        });

        socket.on("ice-candidate", ({ chatId, toUserId, fromUserId, candidate }) => {
            console.log(`Forwarding ICE candidate from ${fromUserId} to ${toUserId}`);
            const targetSocketId = userSocketMap[toUserId];
            if (targetSocketId) {
                io.to(targetSocketId).emit("ice-candidate", { chatId, fromUserId, toUserId, candidate });
            }
        });

        socket.on("endVideoCall", ({ chatId, userId, role }) => {
            console.log(`User ${userId} (${role}) ended video call in chat ${chatId}`);
            
            // If an instructor ends the call, notify everyone to end
            if (role === 'instructor') {
                io.in(chatId).emit("videoCallEnded", { chatId, userId, role });
            } else {
                // If a student leaves, just notify that they left
                socket.to(chatId).emit("userLeftCall", { chatId, userId, role });
            }
            
            // Remove user from active rooms
            if (activeRooms[chatId]) {
                activeRooms[chatId] = activeRooms[chatId].filter(id => id !== userId);
                if (activeRooms[chatId].length === 0) {
                    delete activeRooms[chatId];
                }
            }
        });

        // Handle call initiation
        socket.on("initiateCall", ({ chatId, callerId, callerName }) => {
            if (!chatId) return;
            // Broadcast to everyone in the chat room except the caller
            socket.to(chatId).emit("incomingCall", { chatId, callerId, callerName });
        });

        // Handle call acceptance
        socket.on("acceptCall", ({ chatId, accepterId }) => {
            if (!chatId) return;
            // Broadcast to everyone in the chat room
            io.in(chatId).emit("callAccepted", { chatId, accepterId });
        });

        // Handle call rejection
        socket.on("rejectCall", ({ chatId, rejecterId }) => {
            if (!chatId) return;
            // Broadcast to everyone in the chat room
            io.in(chatId).emit("callRejected", { chatId, rejecterId });
        });

        // Initialize streaming (instructor only)
        socket.on("initiateStream", ({ chatId, streamerId, streamerName }) => {
            if (!chatId) return;
            
            console.log(`Stream initiated by ${streamerName} in chat ${chatId}`);
            
            // Store streaming information
            const streamInfo: StreamInfo = {
                chatId,
                streamerId,
                streamerName,
                viewers: []
            };
            
            // Store stream info
            activeStreams.set(chatId, streamInfo);
            
            // Join the stream room
            socket.join(`stream:${chatId}`);
            
            // Notify all users in the chat room about the stream
            io.to(chatId).emit("streamStarted", {
                chatId,
                streamerId,
                streamerName
            });
        });
        
        // Join stream as a viewer (student)
        socket.on("joinStream", ({ chatId, userId, username }) => {
            if (!chatId) return;
            
            console.log(`User ${username} joined stream in chat ${chatId}`);
            
            // Add to stream room
            socket.join(`stream:${chatId}`);
            
            // Get the stream info and update viewers
            const streamInfo = activeStreams.get(chatId);
            if (streamInfo && !streamInfo.viewers.includes(userId)) {
                streamInfo.viewers.push(userId);
                
                // Notify the instructor about this viewer specifically
                // so they can establish a direct WebRTC connection
                const instructorSocketId = userSocketMap[streamInfo.streamerId];
                if (instructorSocketId) {
                    io.to(instructorSocketId).emit("newStreamViewer", {
                        chatId,
                        viewerId: userId,
                        viewerName: username
                    });
                }
            }
            
            // Notify everyone in the stream about new viewer
            io.to(`stream:${chatId}`).emit("userJoinedStream", {
                chatId,
                userId,
                username
            });
        });
        
        // Leave stream as a viewer (student)
        socket.on("leaveStream", ({ chatId, userId, username }) => {
            if (!chatId) return;
            
            console.log(`User ${username} left stream in chat ${chatId}`);
            
            // Remove from stream room
            socket.leave(`stream:${chatId}`);
            
            // Update viewers list
            const streamInfo = activeStreams.get(chatId);
            if (streamInfo) {
                streamInfo.viewers = streamInfo.viewers.filter(viewerId => viewerId !== userId);
            }
            
            // Notify instructor and other viewers
            io.to(`stream:${chatId}`).emit("userLeftStream", {
                chatId,
                userId,
                username
            });
        });
        
        // End stream (instructor only)
        socket.on("endStream", ({ chatId, userId, role }) => {
            if (!chatId || role !== 'instructor') return;
            
            const streamInfo = activeStreams.get(chatId);
            const streamerName = streamInfo ? streamInfo.streamerName : 'Instructor';
            
            console.log(`Stream ended by ${streamerName} in chat ${chatId}`);
            
            // Notify all users in stream room
            io.to(`stream:${chatId}`).emit("streamEnded", {
                chatId,
                userId,
                streamerName
            });
            
            // Clean up stream data
            activeStreams.delete(chatId);
            
            // Clean up room - force all sockets to leave this room
            const roomName = `stream:${chatId}`;
            io.in(roomName).socketsLeave(roomName);
        });

        // Handle disconnect
        socket.on("disconnect", () => {
            console.log(`Socket ${socket.id} disconnected`);
            
            // Find user ID from socket ID
            let disconnectedUserId = null;
            let userRole = null;
            
            for (const [key, value] of Object.entries(userSocketMap)) {
                if (value === socket.id) {
                    disconnectedUserId = key;
                    // You would need to store user roles somewhere
                    // This is a placeholder - implement according to your user data structure
                    userRole = userRoles[key] || 'student';
                    delete userSocketMap[key];
                    console.log(`User ${key} disconnected`);
                    break;
                }
            }
            
            // Remove user from active rooms and notify about call leaving
            if (disconnectedUserId) {
                // Clean up any active video calls this user was in
                for (const roomId in activeRooms) {
                    if (activeRooms[roomId].includes(disconnectedUserId)) {
                        // Notify room that user left the call
                        io.to(roomId).emit("userLeftCall", { 
                            chatId: roomId, 
                            userId: disconnectedUserId,
                            role: userRole
                        });
                        
                        // If instructor disconnected, end call for everyone
                        if (userRole === 'instructor') {
                            io.to(roomId).emit("videoCallEnded", { 
                                chatId: roomId, 
                                userId: disconnectedUserId,
                                role: userRole
                            });
                        }
                        
                        // Remove from active room
                        activeRooms[roomId] = activeRooms[roomId].filter(id => id !== disconnectedUserId);
                        if (activeRooms[roomId].length === 0) {
                            delete activeRooms[roomId];
                        }
                    }
                }
                
                // Handle stream cleanup on disconnect
                for (const [streamChatId, streamInfo] of activeStreams.entries()) {
                    // If disconnected user is a viewer
                    if (streamInfo.viewers.includes(disconnectedUserId)) {
                        console.log(`Removing viewer ${disconnectedUserId} from stream ${streamChatId}`);
                        // Remove from viewers
                        streamInfo.viewers = streamInfo.viewers.filter(id => id !== disconnectedUserId);
                        
                        // Get viewer username if available
                        const viewerName = "User"; // Placeholder - could be improved
                        
                        // Notify streamer about viewer leaving
                        const streamerSocketId = userSocketMap[streamInfo.streamerId];
                        if (streamerSocketId) {
                            io.to(streamerSocketId).emit("viewerLeft", {
                                userId: disconnectedUserId,
                                username: viewerName,
                                viewers: streamInfo.viewers,
                                viewerNames: streamInfo.viewers.map(id => "User") // This could be improved
                            });
                        }
                    } 
                    
                    // If disconnected user is the streamer, end the stream for everyone
                    if (streamInfo.streamerId === disconnectedUserId) {
                        console.log(`Streamer ${disconnectedUserId} disconnected, ending stream in ${streamChatId}`);
                        // Notify everyone that stream ended
                        io.to(streamChatId).emit("streamEnded", {
                            chatId: streamChatId,
                            streamerId: disconnectedUserId,
                            streamerName: streamInfo.streamerName
                        });
                        
                        // Clean up stream data
                        activeStreams.delete(streamChatId);
                    }
                }
                
                // Broadcast updated online users
                io.emit("getOnlineUsers", Object.keys(userSocketMap));
            }
        });
    });
};

export default connectSocketIo;