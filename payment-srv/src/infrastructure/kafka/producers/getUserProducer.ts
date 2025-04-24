import { producer } from "..";

export default async(userId:string,topic?:string) => {
    try {
        const targetTopic = topic || "default-topic";

        await producer.connect();

        const messages = {
            topic: targetTopic,
            messages: [
                {
                    key:"getUserDetailsFromPayment",
                    value: JSON.stringify(userId)
                }
            ]
        }

        await producer.send(messages);

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Kafka produce error:', error.message);
        } else {
            console.error('Unknown error occurred while producing Kafka message');
        }
    } finally {
        await producer.disconnect();
    }
    
}