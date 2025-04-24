import { producer } from "..";

export default async(userId:string,topic?:string) => {
    try {
        const targetTopic = topic || "default-topic";

        await producer.connect();

        const messages = {
            topic: targetTopic,
            messages: [
                {
                    key:"getUserDetails",
                    value: JSON.stringify(userId)
                }
            ]
        }

        await producer.send(messages);

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('kafka produce error:', error.message);
        } else {
            console.error('kafka produce error: An unknown error occurred');
        }
    } finally {
        await producer.disconnect();
    }
    
}