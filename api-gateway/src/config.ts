import {config} from 'dotenv';
config();

export const PORT:number = Number(process.env.PORT || 3000)
export const Service = {
    AUTH_SERVICE_URL : process.env.AUTH_SERVICE_URL || "http://localhost:3001",
    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173"
}