import express, {Application} from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { applySecurityMiddleware } from "./middleware/security";
import { routes } from "./routes";
import { redirectDebugMiddleware } from "./redirect-debug";


const app:Application = express();

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

applySecurityMiddleware(app);

app.use(redirectDebugMiddleware);
routes(app);

export default app;