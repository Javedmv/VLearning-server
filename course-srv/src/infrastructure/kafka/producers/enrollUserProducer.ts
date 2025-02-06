import { producer } from ".."

export default async (courseId:string , userId:string, topic?:string) => {
    try {
        const targetTopic = topic || "default-topic";
        await producer.connect();

        const messages = {
            topic: targetTopic,
            messages: [
                {
                    key:"enrollStudentUser",
                    value: JSON.stringify({courseId,userId})
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