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
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Kafka produce error:', error.message);
        } else {
            console.error('Unknown error occurred while producing Kafka message');
        }
    } finally {
        await producer.disconnect();
    }
    
}