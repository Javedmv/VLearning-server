import {config} from 'dotenv';
config();

export const PORT:number = Number(process.env.PORT || 3000)
export const Service = {
    CLIENT_URL: process.env.CLIENT_URL!,
    AUTH_SERVICE_URL : process.env.AUTH_SERVICE_URL!,
    NOTIFICATION_SERVICE_URL : process.env.NOTIFICATION_SERVICE_URL!,
    COURSE_SERVICE_URL : process.env.COURSE_SERVICE_URL!,
    PAYMENT_SERVICE_URL : process.env.PAYMENT_SERVICE_URL!,
    CHAT_SERVICE_URL : process.env.CHAT_SERVICE_URL!,
}