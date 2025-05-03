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
const corsOptions = {
    origin: allowedOrigins,
    methods: ["GET,HEAD,PUT,POST,DELETE,OPTIONS"],
    credentials : true
}

app.use(cors(corsOptions));

const server = createServer(app);

const io = connectSokcetIo(server);

const socketService = new SocketService(io);

const fullDependencies = {
    ...dependencies,
    socketService: socketService
};

app.use(routes(fullDependencies));

app.use(errorHandler)

server.listen(PORT,() => {
    console.log(`Chat server running on ports: http://localhost${PORT}`);
})

export default app;