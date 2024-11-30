import {config} from 'dotenv';
config();

export const PORT:number = Number(process.env.PORT || 3000)
export const Service = {
    CLIENT_URL: process.env.CLIENT_URL!,
    AUTH_SERVICE_URL : process.env.AUTH_SERVICE_URL!,
    NOTIFICATION_SERVICE_URL : process.env.NOTIFICATION_SERVICE_URL!,
    USER_SERVICE_URL : process.env.USER_SERVICE_URL!
}