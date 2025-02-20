import { NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const getPaymentHistoryController = (dependencies:IDependencies) => {
    const {useCases:{getPaymentHistoryUseCase}} = dependencies;
    return async (req:any, res:any, next:NextFunction) => {
        try {
            const userId = req.params.id;
            console.log(userId,"in controller");
            const paymentHistory = await getPaymentHistoryUseCase(dependencies).execute(userId);
            console.log(paymentHistory);

            res.status(200).json({
                success:true,
                data: paymentHistory,
            })
            return;
        } catch (error) {
            console.error("ERROR IN GET PAYMENT HISTORY CONTROLLER",error)
        }
    }
}