import app from "./app";
import { PORT } from "./config";

app.listen(PORT,() => {
    console.log(`api gateway is running on port ${PORT}`);
})