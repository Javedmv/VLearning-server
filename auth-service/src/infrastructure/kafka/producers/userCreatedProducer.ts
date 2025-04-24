import { producer } from "..";
import { UserEntity } from "../../../domain/entities";

export default async(data: UserEntity,topic?: string) => {
    try {
        const targetTopic = topic || "default-topic";

        await producer.connect();

        const messages = {
            topic: targetTopic,
            messages:[
                {
                    key:"userCreated",
                    value: JSON.stringify(data)
                }
            ]
        }

        await producer.send(messages);

        // const messages = [
        //     {
        //         topic: targetTopic,
        //         messages: [{
        //             key: "userCreated",
        //             value: JSON.stringify(data)
        //         }]
        //     },
        // ]
        // await producer.sendBatch({ topicMessages: messages });

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('kafka produce error:', error.message);
        } else {
            console.error('kafka produce error:', error);
        }
    } finally {
        await producer.disconnect();
    }
    
}