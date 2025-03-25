import { Server as SocketIoServer } from 'socket.io';
import dotenv from "dotenv";
import { Server as HttpServer } from 'http';
import { MessageModel } from "../databases/mongoDB/models";

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

        socket.on("joinVideoCall", ({ chatId }) => {
            if (!chatId) return;
            console.log(`User joined video call in chat room ${chatId}`);
        });

        socket.on("answer", ({ answer }) => {
            socket.broadcast.emit("answer", { answer });
        });

        socket.on("ice-candidate", ({ candidate }) => {
            socket.broadcast.emit("ice-candidate", { candidate });
        });

        socket.on("endVideoCall", ({ chatId }) => {
            if (!chatId) return;
            console.log(`Video call ended in chat room ${chatId}`);
            io.in(chatId).emit("videoCallEnded");
        });

        // Handle disconnect
        socket.on("disconnect", () => {
            console.log(`Socket ${socket.id} disconnected`);
            
            // Find user ID from socket ID
            let disconnectedUserId = null;
            for (const [key, value] of Object.entries(userSocketMap)) {
                if (value === socket.id) {
                    disconnectedUserId = key;
                    delete userSocketMap[key];
                    console.log(`User ${key} disconnected`);
                    break;
                }
            }
            
            // Remove user from active rooms
            if (disconnectedUserId) {
                for (const roomId in activeRooms) {
                    activeRooms[roomId] = activeRooms[roomId].filter(id => id !== disconnectedUserId);
                    if (activeRooms[roomId].length === 0) {
                        delete activeRooms[roomId];
                    }
                }
                
                // Broadcast updated online users
                io.emit("getOnlineUsers", Object.keys(userSocketMap));
            }
        });
    });
};

export default connectSocketIo;