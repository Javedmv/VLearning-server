
export interface ISubscriber {
    hello: () => void;
}

export interface IAuthSubscriber extends Pick<ISubscriber, "hello"> {}

export const createSubscriber = (): IAuthSubscriber => {
    return {
        hello: () => {
           console.log("Hello from subscriber");
        }
    }
}