import { producer } from ".."

export default async (enrollmentData :any, topic?:string) => {
    try {
        const targetTopic = topic || "default-topic";
        await producer.connect();

        const messages = {
            topic: targetTopic,
            messages: [
                {
                    key:"lessonProgress",
                    value: JSON.stringify(enrollmentData)
                }
            ]
        }

        await producer.send(messages);
    } catch (error:any) {
        console.error('kafka producer error in enroll user Producer',error?.message)
    } finally {
        await producer.disconnect();
    }
}