"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const config_1 = require("../__boot/config");
const dependencies_1 = require("../__boot/dependencies");
const routes_1 = require("../infrastructure/routes");
const error_1 = require("../_lib/common/error");
// import { multerError } from "../_lib/common/error/multerError";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
app.use('/', (0, routes_1.routes)(dependencies_1.dependencies));
app.use('*', (req, res) => {
    res.status(404).json({ success: false, message: 'api not found' });
});
app.use(error_1.errorHandler);
// app.use(multerError);
app.listen(config_1.PORT, () => {
    console.log(`auth server running on port: http://localhost${config_1.PORT}`);
});
exports.default = app;
