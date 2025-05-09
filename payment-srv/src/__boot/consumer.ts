import { consumer } from "../infrastructure/kafka";
import { createSubscriber, IPaymentSubscriber } from "../infrastructure/kafka/subscriber";

export const runConsumer = async () => {
    try {
        await consumer.connect();

        await consumer.subscribe({
            topic:"payment-srv-topic",
            fromBeginning: true
        })

        const subscriber = createSubscriber();

        await consumer.run({
            eachMessage: async ({message}) => {
                const {key, value} = message;
                console.log(key, "in payment service")
                
                const subscriberMethod = String(key) as keyof IPaymentSubscriber;
                const subscriberData = JSON.parse(String(value));
                console.log(subscriberMethod)

                if (subscriber[subscriberMethod] && typeof subscriber[subscriberMethod] === 'function') {
                    try {
                        await subscriber[subscriberMethod](subscriberData);
                    } catch (error: unknown) {
                        if (error instanceof Error) {
                            console.error(`Error processing message from topic: ${error.message}`);
                            throw new Error(error.message);
                        } else {
                            console.error("An unknown error occurred while processing the message.");
                            throw new Error("Unknown error processing message");
                        }
                    }
                    
                } else {
                    console.error(`Method ${subscriberMethod} does not exist on subscriber`);
                }
            }
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error("Kafka Consume Error: " + error.message);
        } else {
            throw new Error("Kafka Consume Error: Unknown error occurred");
        }
    }    
}


export const stopConsumer = async () => {
    await consumer.stop();
    await consumer.disconnect();
}