import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { sendVerificationMail } from "../../infrastructure/services";

export const sendVerificationMailController = (dependencies: IDependencies) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        console.log(req ,"cosnoled req of sendVerificationController=====******++++++", req.body.email)

        if (!req.body.email) {
          throw new Error("Email is required!");
        }
        
        await sendVerificationMail(req.body.email);
  
        res.status(200).json({
          success: true,
          data: {},
          message: "Email send!",
        });
      } catch (error) {
        next(error);
      }
    };
  };