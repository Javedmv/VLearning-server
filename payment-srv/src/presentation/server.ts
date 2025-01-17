import express ,{Application,Request,Response} from "express";
import cookieParser from 'cookie-parser';
import {config} from "dotenv";

config();

import cors from "cors";

const app:Application = express();
const PORT:number = Number(process.env.PORT!)

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/",(req:Request, res:Response) => {
    res.status(200).json({
        message:"Payment service is ON!!!!"
    })
})

app.listen(PORT,() => {
    console.log(`connected to Payment service at http://localhost:${PORT}`);  
})

export default app;