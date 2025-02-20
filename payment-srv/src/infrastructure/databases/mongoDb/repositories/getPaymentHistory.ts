import { IPaymentHistory } from "../../../../domain/useCases/IGetPaymentHistoryUseCase";
import { PaymentModel } from "../models";

export const getPaymentHistory = async (userId: string):Promise<IPaymentHistory[]> => {
    try {
        // Find all payments for the given userId
        const payments = await PaymentModel.find({ userId }).sort({ createdAt: -1 });
        console.log(payments)
        return payments as IPaymentHistory[]; // Return the payment history
    } catch (error) {
        console.error('Error fetching payment history:', error);
        throw new Error('Error fetching payment history');
    }
};
