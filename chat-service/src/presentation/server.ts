import express,{ Request,Response,NextFunction, Application } from "express"
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import { PORT } from "../__boot/config";

dotenv.config();

const app: Application = express();


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.listen(PORT,() => {
    console.log(`Chat server running on port: http://localhost${PORT}`);
})

export default app;