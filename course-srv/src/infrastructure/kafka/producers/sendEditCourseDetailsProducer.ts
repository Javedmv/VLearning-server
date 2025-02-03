import { producer } from "..";

export default async (course:any,topic?:string) => {
    try {
        const targetTopic = topic || "default topic"
        await producer.connect();

        const messages = {
            topic: targetTopic,
            messages: [
                {
                    key: "editCourse",
                    value : JSON.stringify(course)
                }
            ]
        }

        await producer.send(messages);

    } catch (error:any) {
        console.error('kafka producer error in send Edit course details',error?.message)
    } finally {
        await producer.disconnect();
    }
}