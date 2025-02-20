import express,{ Request,Response,NextFunction, Application } from "express"
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import { PORT } from "../__boot/config";
import { routes } from "../infrastructure/routes";
import { dependencies } from "../__boot/dependencies";

dotenv.config();

const app: Application = express();


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use(routes(dependencies))

app.listen(PORT,() => {
    console.log(`Chat server running on port: http://localhost${PORT}`);
})

export default app;