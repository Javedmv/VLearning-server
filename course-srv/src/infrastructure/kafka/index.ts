import { Kafka, Partitioners, Producer } from 'kafkajs';

const kafka = new Kafka({
    clientId: "course-service",
    brokers: ["localhost:29092"],
    requestTimeout: 30000,
})

export const producer:Producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner
})