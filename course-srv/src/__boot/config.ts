import { config } from 'dotenv';
import mongoose from 'mongoose';

config();

export const PORT = Number(process.env.PORT || 3003);

export const connectDB = async () => {
    try {
        const URI = process.env.MONGO_URI as string;
        const client = await mongoose.connect(process.env.MONGO_URI as string, {
            serverSelectionTimeoutMS: 30000, // Increase timeout
            })

        if(client){
            console.log(`
                -------------------------------------
                -     Course SRV MONGODB CONNECTED  -
                -------------------------------------
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