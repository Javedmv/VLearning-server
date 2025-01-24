import { producer } from ".."

export default async(courseId:string, topic?:string) => {
    try {
        const targetTopic = topic || "default-topic";

        await producer.connect();
        const message = {
            topic: targetTopic,
            messages: [
                {
                    key:"getCourseDetailsFromPayment",
                    value: JSON.stringify(courseId)
                }
            ]
        }
        await producer.send(message);
        
    } catch (error: any) {
        console.error('kafka produce error:',error?.message);
    }finally {
        await producer.disconnect();
    }
}