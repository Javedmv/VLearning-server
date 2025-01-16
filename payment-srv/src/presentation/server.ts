import express ,{Application,Request,Response} from "express";
import cookieParser from 'cookie-parser';
import {config} from "dotenv";

config();

import cors from "cors";

const app:Application = express();
const port:number = Number(process.env.PORT!)