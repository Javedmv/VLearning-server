import express,{ Application, Request, Response, urlencoded} from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app:Application = express();
const PORT:number = Number(process.env.PORT || 3002);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/",(req:Request, res:Response) => {
    res.status(200).json({
        message:"Notification service is ON!!!!"
    })
})

app.listen(PORT,() => {
    console.log(`connected to notification service at http://localhost:${PORT}`);  
})

export default app;