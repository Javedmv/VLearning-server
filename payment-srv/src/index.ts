import Server from './presentation/server'
import { connectDB } from './__boot/config';
import { runConsumer, stopConsumer } from './__boot/consumer';
import { producer } from './infrastructure/kafka';

(async () => {
    try {
        Server;
        
        await Promise.all([connectDB(), runConsumer()])
        // TODO: disconnected the consumer reconnect it when needed
        .then(() => {
            console.log("kafka consumer is running")
        })
        .catch((error:any) => {
            console.error(`Error while initializing Kafka consumer: ${error}`);
            process.exit(0);
        });
        
    } catch (error:any) {
        console.error(`Error during initialization: ${error.message}`);
        process.exit(1);
    }
     // Handle graceful shutdown signals anytime
    process.on("SIGTERM", async () => {
        console.log("SIGTERM received. Shutting down...");
        await cleanupAndExit();
    });

    process.on("SIGINT", async () => {
        console.log("SIGINT received. Shutting down...");
        await cleanupAndExit();
    });

    // Cleanup function to stop consumer and exit any process
    const cleanupAndExit = async () => {
        try {
            console.log("Stopping Kafka consumer...");
            await stopConsumer();
            console.log("Kafka consumer stopped.");
    
            console.log("Disconnecting Kafka producer...");
            await producer.disconnect();
            console.log("Kafka producer disconnected.");
        } catch (error) {
            console.error("Error while shutting down services:", error);
        } finally {
            console.log("Process exiting...");
            process.exit(0);
        }
    }
})();