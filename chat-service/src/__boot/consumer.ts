import {consumer} from "../infrastructure/kafka/index";
import {createSubscriber,IAuthSubscriber} from "../infrastructure/kafka/subscriber";

export const runConsumer = async () => {
    try {
        await consumer.connect();

        await consumer.subscribe({
            topic: "chat-srv-topic",
            fromBeginning: true
        })
        
        const subscriber = createSubscriber();

        await consumer.run({
            eachMessage: async ({message}) => {
                const {key, value} = message;
                
                const subscriberMethod = String(key) as keyof IAuthSubscriber;
                const subscriberData = JSON.parse(String(value));
                console.log(subscriberMethod)

                if (subscriber[subscriberMethod] && typeof subscriber[subscriberMethod] === 'function') {
                    try {
                        // TODO: uncomment the above line and implement the subscriber method
                        await subscriber[subscriberMethod](subscriberData);
                    } catch (error: unknown) {
                        if (error instanceof Error) {
                            console.error(`Error processing message from topic: ${error.message}`);
                            throw new Error(error.message);
                        } else {
                            console.error("Error processing message from topic: Unknown error", error);
                            throw new Error("An unknown error occurred");
                        }
                    }
                    
                } else {
                    console.error(`Method ${subscriberMethod} does not exist on subscriber`);
                }
            }
        });
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error("Kafka Consume Error : " + error.message);
        } else {
            throw new Error("Kafka Consume Error: An unknown error occurred");
        }
    }    
}

export const stopConsumer = async () => {
    await consumer.stop();
    await consumer.disconnect();
}