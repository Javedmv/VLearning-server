import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { createResponse, StatusCode } from "../../_lib/constants/constants";

export const getPaymentHistoryController = (dependencies:IDependencies) => {
    const {useCases:{getPaymentHistoryUseCase}} = dependencies;
    return async (req:Request, res:Response, next:NextFunction) => {
        try {
            const userId = req.params.id;
            console.log(userId,"in controller");
            const paymentHistory = await getPaymentHistoryUseCase(dependencies).execute(userId);
            console.log(paymentHistory);

            res.status(StatusCode.SUCCESS).json(
                createResponse(
                    StatusCode.SUCCESS,
                    paymentHistory
                )
            );
            return;
        } catch (error) {
            console.error("ERROR IN GET PAYMENT HISTORY CONTROLLER",error)
        }
    }
}