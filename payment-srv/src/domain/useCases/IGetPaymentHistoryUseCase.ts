import { IPayment } from "../entities/PaymentEntity";
export interface IPaymentHistory extends IPayment {
    _id: string;
}

export interface IGetPaymentHistoryUseCase {
    execute(userId:string): Promise<IPaymentHistory[]>
}