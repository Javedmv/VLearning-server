import { CourseFilters } from "../../../../domain/entities";
import { IPaymentHistory } from "../../../../domain/useCases/IGetPaymentHistoryUseCase";
import { PaymentModel } from "../models";

export const getPaymentHistory = async (userId: string,filters:CourseFilters):Promise<{ payments: IPaymentHistory[]; total: number }> => {
    try {
        const paymentCount = await PaymentModel.countDocuments({ userId });
        const payments = await PaymentModel.find({ userId })
        .sort({ createdAt: -1 })
        .skip((filters.page - 1) * filters.limit)
        .limit(filters.limit);

        return {payments: payments as IPaymentHistory[], total:paymentCount as number};
    } catch (error) {
        console.error('Error fetching payment history:', error);
        throw new Error('Error fetching payment history');
    }
};
