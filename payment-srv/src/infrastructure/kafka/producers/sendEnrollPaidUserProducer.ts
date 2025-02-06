import { producer } from "..";

export default async(userId:string,courseId:string,topic?:string) => {
    try {
        const targetTopic = topic || "default-topic";

        await producer.connect();

        const messages = {
            topic: targetTopic,
            messages: [
                {
                    key:"EnrollPaidUser",
                    value: JSON.stringify({userId,courseId})
                }
            ]
        }

        await producer.send(messages);

    } catch (error:any) {
        console.error('kafka produce error:',error?.message)
    } finally{
        await producer.disconnect();
    }
}