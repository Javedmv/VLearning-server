import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { config } from 'dotenv';
import bodyParser from "body-parser";
import helmet from 'helmet';


config();

import { errorHandler } from "../_lib/error";
import {routes} from "../infrastructure/routes";
import { dependencies } from "../__boot/dependencies";
import  cors  from 'cors';


const app: Application = express();
const PORT: number = Number(process.env.PORT!)

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
// app.use(bodyParser.text({type: '/'}));
app.use(cors({
    origin: 'https://v-learning-client-5r8j.vercel.app',
    credentials: true,
    allowedHeaders: ['Range', 'Authorization', 'Content-Type','Accept'],
    exposedHeaders: ['Content-Disposition','Content-Range', 'Accept-Ranges', 'Content-Length', 'Content-Type'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// Add helmet with CORP configuration
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.get("/",(req:Request, res:Response) => {
    res.status(200).json({
        message:"course service is ON!!!!"
        
    })
})
app.use('/',routes(dependencies));



app.use('*',(req:Request,res:Response)=>{
    res.status(404).json({success:false, message:'api not found'})
});

app.use(errorHandler)


app.listen(PORT,'0.0.0.0',() => {
    console.log(`connected to course services at http://localhost:${PORT}`);  
})

export default app;