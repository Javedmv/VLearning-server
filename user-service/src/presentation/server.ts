import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { config } from 'dotenv';

config();

const app: Application = express();
const PORT: number = Number(process.env.PORT!)

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/",(req:Request, res:Response) => {
    res.status(200).json({
        message:"user service is ON!!!!"
    })
})

app.listen(PORT,() => {
    console.log(`connected to user service at http://localhost:${PORT}`);  
})

export default app;