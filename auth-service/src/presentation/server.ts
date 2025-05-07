import express,{Application, Request, Response} from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import morgan from "morgan"


dotenv.config();
import { PORT } from "../__boot/config";
import { dependencies } from "../__boot/dependencies";
import { routes } from "../infrastructure/routes";
import { errorHandler } from "../_lib/common/error";
// import { multerError } from "../_lib/common/error/multerError";
import cors from "cors";
const app:Application = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}

app.use(cors({
    origin: 'https://v-learning-client-5r8j.vercel.app',
    credentials: true,
    allowedHeaders: ['Range', 'Authorization', 'Content-Type','Accept'],
    exposedHeaders: ['Content-Disposition','Content-Range', 'Accept-Ranges', 'Content-Length', 'Content-Type'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use('/',routes(dependencies));

app.use('*',(req:Request,res:Response)=>{
    res.status(404).json({success:false, message:'api not found'})
});

app.use(errorHandler)

app.listen(PORT,'0.0.0.0',() => {
    console.log(`auth server running on ports: http://localhost${PORT}`);
})

export default app;