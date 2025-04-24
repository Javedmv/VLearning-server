import { producer } from ".."
import { TOBE } from "../../../_lib/common/Tobe";

export default async (enrollmentData :TOBE, topic?:string) => {
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
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('kafka producer error in enroll user Producer', error.message);
        } else {
            console.error('kafka producer error in enroll user Producer: An unknown error occurred');
        }
    } finally {
        await producer.disconnect();
    }
    
}