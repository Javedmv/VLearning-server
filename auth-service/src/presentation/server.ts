import express,{Application, Request, Response} from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import morgan from "morgan"

import { PORT } from "../config/envConfig/config";
dotenv.config();

const app:Application = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}

app.use('*',(req:Request,res:Response)=>{
    res.status(404).json({success:false, message:'api not found'})
})

app.listen(PORT,() => {
    console.log(`auth server running on port: http://localhost${PORT}`);
})

export default app;