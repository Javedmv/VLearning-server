import { producer } from ".."
import { TOBE } from "../../../_lib/utils/Tobe";

export default async(data: TOBE,topic?: string) => {
    try {
        const targetTopic = topic || "default-topic"

        await producer.connect();

        const messages = {
            topic: targetTopic,
            messages:[
                {
                    key:"addUser",
                    value:JSON.stringify(data)
                }
            ]
        }

        await producer.send(messages);


    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('kafka produce error:', error.message);
        } else {
            console.error('kafka produce error:', error);
        }
    } finally{
        await producer.disconnect();
    }
}