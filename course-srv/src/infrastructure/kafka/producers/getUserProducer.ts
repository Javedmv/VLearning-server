import { producer } from "..";

export default async(userId:string,topic?:string) => {
    try {
        const targetTopic = topic || "default-topic";
        await producer.connect();

        const message = {
            topic: targetTopic,
            messages: [
                {
                    key:"getUserDetails",
                    value: JSON.stringify(userId)
                }
            ]
        }

        await producer.send(message);

    } catch (error:any) {
        console.error('kafka produce error:',error?.message)
    } finally{
        await producer.disconnect();
    }
}