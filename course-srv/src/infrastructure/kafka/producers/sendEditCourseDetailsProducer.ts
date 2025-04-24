import { producer } from "..";
import { TOBE } from "../../../_lib/common/Tobe";

export default async (course:TOBE,topic?:string) => {
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

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('kafka producer error in send Edit course details', error.message);
        } else {
            console.error('kafka producer error in send Edit course details: An unknown error occurred');
        }
    } finally {
        await producer.disconnect();
    }
    
}