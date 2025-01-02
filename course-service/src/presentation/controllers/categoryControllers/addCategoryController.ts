import { NextFunction, Response, Request, response } from "express"
import { IDependencies } from "../../../application/interfaces/IDependencies"
import { ErrorResponse } from "../../../_lib/error";
import { CategoryEntity } from "../../../domain/entities";

export const addCategoryController = (dependencies:IDependencies) => {
    const {useCases:{ addCategoryUseCase }} = dependencies;
    return async(req:Request, res:Response, next:NextFunction)=> {
        try {
            const {name ,description, status} = req.body;
            if(!name || !description || !status){
                return next(ErrorResponse.badRequest("Please fill all the fields"));
            }

            if(!req.file){
                return next(ErrorResponse.badRequest("Please add image"));
            }
            const filename = req.file?.filename ?? "no filename";
            const mimetype = req.file?.mimetype ?? "no mime";
            
            if(filename){
                // TODO:UPLOAD TO S3
            }

            const category:CategoryEntity = {name, description, status, imageUrl:filename}
            console.log(category,typeof category, 'this is inside controller')
            const response = await addCategoryUseCase(dependencies).execute(category)
            console.log(response);




             
        } catch (error) {
            console.log(error)
        }
    }
}