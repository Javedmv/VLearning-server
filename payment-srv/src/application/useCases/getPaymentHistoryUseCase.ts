import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../interfaces/IDependencies";

export const getPaymentHistoryUseCase = (dependencies:IDependencies) => {
    const {repositories:{ getPaymentHistory }} = dependencies;
    return {
        execute: async (userId:string) => {
            try {
                return await getPaymentHistory(userId)
            } catch (error) {
                throw new Error("something went wrong.")
            }
        }
    }
}