import express,{ Application, Request, Response, urlencoded} from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { notificationRoutes } from '../infrastructure/routes';
import { dependencies } from '../__boot/dependencies';
import cors from 'cors'

dotenv.config();

const app:Application = express();
const PORT:number = Number(process.env.PORT || 3002);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// app.use(cors({
//     origin: 'https://v-learning-client-5r8j.vercel.app',
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','HEAD'],
//     credentials: true,
//     // allowedHeaders: ['Authorization', 'Content-Type', 'Range', 'Accept'],
//     // exposedHeaders: ['Content-Disposition', 'Content-Range', 'Accept-Ranges', 'Content-Length', 'Content-Type'],
// }));


app.get("/",(req:Request, res:Response) => {
    res.status(200).json({
        message:"Notification service is ON!!!!!"
    })
})

app.use("/notification", notificationRoutes(dependencies))

app.listen(PORT,'0.0.0.0',() => {
    console.log(`connected to notification services at http://localhost:${PORT}`);  
})

export default app;