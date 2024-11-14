import {NextFunction,Request, Response} from 'express';
import { IDependencies } from '../../application/interfaces/IDependencies';


export const signupController = (dependencies: IDependencies) => {
    
    // const {useCases: {createUserUseCase} } = dependencies

    return async (req:Request, res:Response, next: NextFunction) => {   
        
        const userCredentials = req.body;
    }
}