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
            credentials: true
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
                
                // Notify instructor and other viewers about this new viewer
                io.to(`stream:${chatId}`).emit("userJoinedStream", {
                    chatId,
                    userId,
                    username
                });
                
                // Notify the instructor about this viewer specifically
                // so they can establish a direct WebRTC connection if needed
                const instructorSocketId = userSocketMap[streamInfo.streamerId];
                if (instructorSocketId) {
                    io.to(instructorSocketId).emit("newStreamViewer", {
                        chatId,
                        viewerId: userId,
                        viewerName: username
                    });
                }
                
                console.log(`Updated viewers for stream ${chatId}:`, streamInfo.viewers);
            }
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

        // Handle WebRTC signaling for streaming
        socket.on("streamOffer", ({ chatId, to, from, offer }) => {
            console.log(`Forwarding stream offer from ${from} to ${to}`);
            const targetSocketId = userSocketMap[to];
            if (targetSocketId) {
                io.to(targetSocketId).emit("streamOffer", { chatId, from, to, offer });
            }
        });

        socket.on("streamAnswer", ({ chatId, to, from, answer }) => {
            console.log(`Forwarding stream answer from ${from} to ${to}`);
            const targetSocketId = userSocketMap[to];
            if (targetSocketId) {
                io.to(targetSocketId).emit("streamAnswer", { chatId, from, to, answer });
            }
        });

        socket.on("streamIceCandidate", ({ chatId, to, from, candidate }) => {
            console.log(`Forwarding stream ICE candidate from ${from} to ${to}`);
            const targetSocketId = userSocketMap[to];
            if (targetSocketId) {
                io.to(targetSocketId).emit("streamIceCandidate", { chatId, from, to, candidate });
            }
        });

        // Handle recall students (re-notify about active stream)
        socket.on("recallStudents", ({ chatId, streamerId, streamerName }) => {
            if (!chatId) return;
            
            console.log(`Instructor ${streamerName} is recalling students to stream in chat ${chatId}`);
            
            const streamInfo = activeStreams.get(chatId);
            if (!streamInfo) {
                console.log(`No active stream found for chat ${chatId}`);
                return;
            }
            
            // Get all users in the chat room
            const chatUsers = activeRooms[chatId] || [];
            
            // Get current viewers
            const currentViewers = streamInfo.viewers || [];
            
            // For each user in the chat who is not already a viewer
            chatUsers.forEach(userId => {
                if (!currentViewers.includes(userId) && userId !== streamerId) {
                    console.log(`Re-notifying user ${userId} about stream in chat ${chatId}`);
                    
                    // Get user's socket ID
                    const userSocketId = userSocketMap[userId];
                    if (userSocketId) {
                        // Send stream notification to this user specifically
                        io.to(userSocketId).emit("streamStarted", {
                            chatId,
                            streamerId,
                            streamerName
                        });
                    }
                }
            });
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
                    userRole = userRoles[key] || 'student';
                    delete userSocketMap[key];
                    console.log(`User ${key} disconnected`);
                    break;
                }
            }
            
            if (disconnectedUserId) {
                // Handle stream cleanup on disconnect
                for (const [streamChatId, streamInfo] of activeStreams.entries()) {
                    // If disconnected user is a viewer
                    if (streamInfo.viewers.includes(disconnectedUserId)) {
                        console.log(`Removing viewer ${disconnectedUserId} from stream ${streamChatId}`);
                        // Remove from viewers
                        streamInfo.viewers = streamInfo.viewers.filter(id => id !== disconnectedUserId);
                        
                        // Get viewer username if available
                        const viewerName = "User"; // Placeholder - could be improved
                        
                        // Notify others about viewer leaving
                        io.to(`stream:${streamChatId}`).emit("userLeftStream", {
                            chatId: streamChatId,
                            userId: disconnectedUserId,
                            username: viewerName
                        });
                    } 
                    
                    // If disconnected user is the streamer, end the stream for everyone
                    if (streamInfo.streamerId === disconnectedUserId) {
                        console.log(`Streamer ${disconnectedUserId} disconnected, ending stream in ${streamChatId}`);
                        // Notify everyone that stream ended
                        io.to(streamChatId).emit("streamEnded", {
                            chatId: streamChatId,
                            userId: disconnectedUserId,
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