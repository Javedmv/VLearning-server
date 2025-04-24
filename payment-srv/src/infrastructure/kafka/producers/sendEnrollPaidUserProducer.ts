import { producer } from "..";

export default async (userId: string, courseId: string, topic?: string) => {
    try {
        const targetTopic = topic || "default-topic";

        const messages = {
            topic: targetTopic,
            messages: [
                {
                    key: "enrollPaidUser",
                    value: JSON.stringify({ userId, courseId })
                }
            ]
        };

        await producer.send(messages);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Kafka produce error:', error.message);
        } else {
            console.error('An unknown error occurred while producing Kafka message');
        }
    }
    
};
