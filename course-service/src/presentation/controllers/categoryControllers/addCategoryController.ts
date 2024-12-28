import { NextFunction, Response, Request } from "express"
import { IDependencies } from "../../../application/interfaces/IDependencies"

export const addCategoryController = (dependencies:IDependencies) => {
    const {useCases:{ }} = dependencies;
    return async(req:Request, res:Response, next:NextFunction)=> {
        console.log("hello")
        console.log(req.body)
    }
}