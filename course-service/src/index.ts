import * as server from "./presentation/server";
import { connectDB } from "./__boot/config";

(async () => {
    try {
        server;
        await connectDB();
        console.log("course service is running");
    } catch (error) {
        console.error("issues in running server:", error);
        throw new Error("issues in running server");
    }finally{
        process.on("SIGINT", async () => {
            console.log("server is shutting down");
            process.exit();
        });
    }
})();