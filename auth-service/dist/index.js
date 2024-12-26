"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const server = __importStar(require("./presentation/server"));
const config_1 = require("./__boot/config");
const consumer_1 = require("./__boot/consumer");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        server;
        yield Promise.all([(0, config_1.connectDB)()])
            // await Promise.all([connectDB(), runConsumer()])
            // TODO: disconnected the consumer reconnect it when needed
            .then(() => {
            console.log("kafka consumer is running");
        })
            .catch((error) => {
            console.error(`Error while initializing Kafka consumer: ${error}`);
            process.exit(0);
        });
        // console.log("Server and Kafka consumer are running...");
    }
    catch (error) {
        console.error("Error during initialization:", error);
        process.exit(1); // Exit with failure if startup fails
    }
    // Handle graceful shutdown signals
    process.on("SIGTERM", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("SIGTERM received. Shutting down...");
        yield cleanupAndExit();
    }));
    process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("SIGINT received. Shutting down...");
        yield cleanupAndExit();
    }));
    // Cleanup function to stop consumer and exit process
    const cleanupAndExit = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("Stopping Kafka consumer...");
            yield (0, consumer_1.stopConsumer)();
            console.log("Kafka consumer stopped.");
        }
        catch (error) {
            console.error("Error while stopping Kafka consumer:", error);
        }
        finally {
            console.log("Process exiting...");
            process.exit(0);
        }
    });
}))();
