import { Kafka, Producer, Partitioners, Consumer } from "kafkajs";

// const kafka = new Kafka({
//     clientId: "chat-service",
//     brokers: ["localhost:29092"],
//     requestTimeout: 30000,
// })

// production
const kafka = new Kafka({
    clientId: "auth-service",
    brokers: ["kafka:9092"],
    requestTimeout: 30000,
})

export const producer: Producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
});

export const consumer: Consumer = kafka.consumer({
    groupId: "chat-service-kafka-group"
})

