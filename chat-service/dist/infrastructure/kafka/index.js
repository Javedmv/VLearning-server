"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumer = exports.producer = void 0;
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: "chat-service",
    brokers: ["localhost:29092"],
    requestTimeout: 30000,
});
exports.producer = kafka.producer({
    createPartitioner: kafkajs_1.Partitioners.LegacyPartitioner,
});
exports.consumer = kafka.consumer({
    groupId: "chat-service-kafka-group"
});
