import { producer } from ".."

export default async(data: any,topic?: string) => {
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


    } catch (error:any) {
        console.error('kafka produce error:',error?.message)
    } finally{
        await producer.disconnect();
    }
}