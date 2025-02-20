"use strict";
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
exports.stopConsumer = exports.runConsumer = void 0;
const index_1 = require("../infrastructure/kafka/index");
const subscriber_1 = require("../infrastructure/kafka/subscriber");
const runConsumer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield index_1.consumer.connect();
        yield index_1.consumer.subscribe({
            topic: "chat-srv-topic",
            fromBeginning: true
        });
        const subscriber = (0, subscriber_1.createSubscriber)();
        yield index_1.consumer.run({
            eachMessage: (_a) => __awaiter(void 0, [_a], void 0, function* ({ message }) {
                const { key, value } = message;
                console.log(key, "in auth service from notification service");
                const subscriberMethod = String(key);
                const subscriberData = JSON.parse(String(value));
                console.log(subscriberMethod);
                if (subscriber[subscriberMethod] && typeof subscriber[subscriberMethod] === 'function') {
                    try {
                        // await subscriber[subscriberMethod](subscriberData);
                        // TODO: uncomment the above line and implement the subscriber method
                    }
                    catch (error) {
                        console.error(`Error processing message from topic: ${error.message}`);
                        throw new Error(error === null || error === void 0 ? void 0 : error.message);
                    }
                }
                else {
                    console.error(`Method ${subscriberMethod} does not exist on subscriber`);
                }
            })
        });
    }
    catch (error) {
        throw new Error("Kafka Consume Error : " + (error === null || error === void 0 ? void 0 : error.message));
    }
});
exports.runConsumer = runConsumer;
const stopConsumer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield index_1.consumer.stop();
    yield index_1.consumer.disconnect();
});
exports.stopConsumer = stopConsumer;
