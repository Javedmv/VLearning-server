import express ,{Application,Request,Response} from "express";
import cookieParser from 'cookie-parser';
import {config} from "dotenv";

config();

import { routes } from "../infrastructure/routes/routes";
import { dependencies } from "../__boot/dependencies";

const app:Application = express();
const PORT:number = Number(process.env.PORT!)

app.use((req, res, next) => {
    console.log(req.originalUrl, "orginal url in hte server")
    if (req.originalUrl == '/webhook') {
      next();
      console.log("next executed in paymer server.ts")
    } else {
      express.json()(req, res, (err) => {
        if (err) return next(err); // Ensure proper error handling
        express.urlencoded({ extended: true })(req, res, next);
    });
    }
});

app.use(cookieParser());
app.get("/",(req:Request, res:Response) => {
    res.status(200).json({
        message:"Payment service is ON!!!!"
    })
})

app.use(routes(dependencies))

app.listen(PORT,'0.0.0.0',() => {
    console.log(`connected to Payment services ats http://localhost:${PORT}s`);  
})

export default app;