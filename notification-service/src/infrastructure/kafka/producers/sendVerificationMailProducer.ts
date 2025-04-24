import {producer} from "../index"

export default async (
    data: {
        email: string,
        otp : string
    }
) => {
    try {
        await producer.connect();

        const message = {
            topic: "auth-srv-topic",
            messages: [{
                key: "sendVerificationMail",
                value: JSON.stringify(data)
            }]
        }

        await producer.send(message);

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('kafka produce error : ', error.message);
        } else {
            console.error('kafka produce error : An unknown error occurred');
        }
    } finally {
        await producer.disconnect();
    }
    
}