import { TOBE } from "../../_lib/utils/Tobe";
import {sendVerificationMailConsumer, getUserDetailsConsumer, getUserFromPaymentConsumer} from "./consumers";

export interface ISubscriber {
    sendVerificationMail(data: TOBE): Promise<void>;
    getUserDetails(userId:string): Promise<void>;
    getUserDetailsFromPayment(userId:string): Promise<void>
}

export interface IAuthSubscriber extends Pick<ISubscriber, "sendVerificationMail" | "getUserDetails" | "getUserDetailsFromPayment"> {}

export const createSubscriber = (): IAuthSubscriber => {
    return {
        sendVerificationMail: sendVerificationMailConsumer,
        getUserDetails: getUserDetailsConsumer,
        getUserDetailsFromPayment: getUserFromPaymentConsumer
    }
}