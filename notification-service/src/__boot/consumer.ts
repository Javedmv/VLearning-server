import {consumer} from "../infrastructure/kafka/index"
import { INotificationSubscriber,createSubscriber } from "../infrastructure/kafka/index"

export const runConsumer = async () => {
    try {
        await consumer.connect();
        await consumer.subscribe({
            topic: "notification-srv-topic",
            fromBeginning:true
        })

        const subscriber = createSubscriber();
        await consumer.run({
            eachMessage: async ({message}) => {
                const {key, value} = message;
                
                if(!key){
                    console.error("message key is missing");
                    return;
                }
                if(!value){
                    console.error("message value is missing")
                    return;
                }

                const subscriberMethod = convertKeyToMethodName(String(key));

                if(typeof subscriber[subscriberMethod] !== "function"){
                    console.error(
                        `Method ${subscriberMethod} is not defined on subscriber.`
                      );
                      return;
                }
                
                try {
                    const subscriberData = JSON.parse(String(value));
                    await subscriber[subscriberMethod](subscriberData);
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        console.error(
                            `Error processing message with key ${key}: ${error.message}`
                        );
                    } else {
                        console.error(
                            `Error processing message with key ${key}: An unknown error occurred`
                        );
                    }
                }
                
            }
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Kafka Consume Error -> Notification : ", error.message);
        } else {
            console.error("Kafka Consume Error -> Notification : An unknown error occurred");
        }
    }    
}

function convertKeyToMethodName(key: string): keyof INotificationSubscriber {
    const keyMap: { [key: string]: keyof INotificationSubscriber } = {
      USER_CREATED_MESSAGE: "userCreated",
    //   REQUEST_FORGOT_PASSWORD_MESSAGE: "requestForgotPassword",
    };
    return keyMap[key] || key;
}

export const stopConsumer = async () => {
    await consumer.stop();
    await consumer.disconnect();
  };