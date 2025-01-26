import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { config } from 'dotenv';
import bodyParser from "body-parser";


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
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true,               // Allow credentials
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


app.listen(PORT,() => {
    console.log(`connected to course service at http://localhost:${PORT}`);  
})

export default app;