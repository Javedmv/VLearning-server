import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { createResponse, Messages, StatusCode } from "../../_lib/constants/constants";
import { CourseFilters } from "../../domain/entities";

export const getPaymentHistoryController = (dependencies:IDependencies) => {
    const {useCases:{getPaymentHistoryUseCase}} = dependencies;
    return async (req:Request, res:Response, next:NextFunction) => {
        try {
            if(!req?.user) {
                res.status(StatusCode.UNAUTHORIZED).json(
                    createResponse(
                        StatusCode.UNAUTHORIZED,
                        Messages.UNAUTHORIZED
                    )
                );
                return
            }
            const userId = req.user._id;
            const {limit , page} = req.query;
            const filters: CourseFilters = {
                page: parseInt(page as string, 10) || 1,
                limit: parseInt(limit as string, 10) || 6,
            }
        
            const {payments, total} = await getPaymentHistoryUseCase(dependencies).execute(userId,filters);
            const totalPages = Math.ceil(total / filters.limit);
            const meta = {
                total,
                page: filters.page,
                limit: filters.limit,
                totalPages,
            };

            res.status(StatusCode.SUCCESS).json(
                createResponse(
                    StatusCode.SUCCESS,
                    {payments, meta},
                )
            );
            return;
        } catch (error) {
            console.error("ERROR IN GET PAYMENT HISTORY CONTROLLER",error)
        }
    }
}