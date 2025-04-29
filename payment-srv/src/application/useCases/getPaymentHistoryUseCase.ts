import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../interfaces/IDependencies";
import { CourseFilters } from "../../domain/entities";

export const getPaymentHistoryUseCase = (dependencies:IDependencies) => {
    const {repositories:{ getPaymentHistory }} = dependencies;
    return {
        execute: async (userId:string,filters:CourseFilters) => {
            try {
                return await getPaymentHistory(userId,filters)
            } catch (error) {
                throw new Error("something went wrong.")
            }
        }
    }
}