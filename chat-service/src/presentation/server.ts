import express,{ Request,Response,NextFunction, Application } from "express"
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import { PORT } from "../__boot/config";
import { routes } from "../infrastructure/routes";
import { dependencies } from "../__boot/dependencies";
import { createServer } from "http";
import connectSokcetIo from "../infrastructure/socket/connection";
import { SocketService } from "../infrastructure/socket/SocketService";
import cors from 'cors';
import { errorHandler } from "../_lib/error";

dotenv.config();

const app: Application = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

const allowedOrigins = process.env.CLIENT_URL;

// const corsOptions = {
//     origin: allowedOrigins,
//     methods: ["GET,HEAD,PUT,POST,DELETE,OPTIONS"],
//     credentials : true
// }

// app.use(cors(corsOptions));

app.use(cors({
    origin:allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','HEAD'],
    credentials: true,
    // allowedHeaders: ['Authorization', 'Content-Type', 'Range', 'Accept'],
    // exposedHeaders: ['Content-Disposition', 'Content-Range', 'Accept-Ranges', 'Content-Length', 'Content-Type'],
}));


const server = createServer(app);

const io = connectSokcetIo(server);

const socketService = new SocketService(io);

const fullDependencies = {
    ...dependencies,
    socketService: socketService
};

app.use(routes(fullDependencies));

app.use(errorHandler)

server.listen(PORT,'0.0.0.0',() => {
    console.log(`Chat server running on ports: http://localhost${PORT}`);
})

export default app;