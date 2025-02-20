import { config } from 'dotenv';
import mongoose from "mongoose";

config();

export const PORT = Number(process.env.PORT || 3005);

export const connectDB = async () => {
    try {
        const URI = process.env.MONGO_URI as string;
        const client = await mongoose.connect(URI)

        if(client){
            console.log(`
                -----------------------------------
                -     CHAT SRV MONGODB CONNECTED  -
                -----------------------------------
              `);
        }else{
            console.error("Failed to connect to MongoDB.");
            process.exit(1);
        }
    } catch (error) {
        console.error('Error connecting to MongoDb:', error);
        process.exit(1);
    }
}