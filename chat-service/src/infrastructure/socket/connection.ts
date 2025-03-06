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

    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);
        const userId = socket.handshake.query.userId as string;

        if (userId !== "undefined") {
            userSocketMap[userId] = socket.id;
            console.log(`User ${userId} connected with socket ID ${socket.id}`);
        }

        // Add disconnect handler
        socket.on("disconnect", () => {
            console.log(`Socket ${socket.id} disconnected`);
            // Remove from userSocketMap
            for (const [key, value] of Object.entries(userSocketMap)) {
                if (value === socket.id) {
                    delete userSocketMap[key];
                    console.log(`User ${key} disconnected`);
                    break;
                }
            }
        });

        // Add message handler
        socket.on("sendMessage", (message) => {
            console.log("Message received:", message);
            // Logic to handle the message
            const receiverSocketId = userSocketMap[message.receiver];
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("receiveMessage", message);
            }
        });
    });
};

export default connectSocketIo;