import { runConsumer, stopConsumer } from "./__boot/consumer";
import Server from "./presentation/server";

(async () => {
    try {
        Server;

        await runConsumer()
        .then(() => {
            console.log("kafka consumer is running")
        })
        .catch((error:any) => {
            console.error(`Error while initializing Kafka consumer: ${error}`);
            process.exit(0);
        });

    }catch (error: any) {
        console.error(`Error during initialization: ${error.message}`);
        process.exit(1);
    } finally {
        process.on("SIGINT", async () => {
        console.log("\n\nServer is shutting down....");
        stopConsumer();
      });
    }
})();