import { Consumer, Kafka, Partitioners, Producer } from 'kafkajs';

// const kafka = new Kafka({
//     clientId: "payment-service",
//     brokers: ["localhost:29092"],
//     requestTimeout: 30000,
// })

// production
const kafka = new Kafka({
    clientId: "payment-service",
    brokers: ["kafka:9092"],
    requestTimeout: 30000,
})

export const producer:Producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner
})

export const consumer:Consumer = kafka.consumer({
    groupId:"payment-service-kafka-group"
})