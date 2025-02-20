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
                console.log(key, "in auth service from notification service")
                
                const subscriberMethod = String(key) as keyof IAuthSubscriber;
                const subscriberData = JSON.parse(String(value));
                console.log(subscriberMethod)

                if (subscriber[subscriberMethod] && typeof subscriber[subscriberMethod] === 'function') {
                    try {
                        // await subscriber[subscriberMethod](subscriberData);
                        // TODO: uncomment the above line and implement the subscriber method
                    } catch (error: any) {
                        console.error(`Error processing message from topic: ${error.message}`);
                        throw new Error(error?.message);
                    }
                } else {
                    console.error(`Method ${subscriberMethod} does not exist on subscriber`);
                }
            }
        });
        
    } catch (error:any) {
        throw new Error("Kafka Consume Error : " + error?.message);
    }
}

export const stopConsumer = async () => {
    await consumer.stop();
    await consumer.disconnect();
}