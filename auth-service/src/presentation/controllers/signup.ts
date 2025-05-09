import {NextFunction,Request, Response} from 'express';
import { IDependencies } from '../../application/interfaces/IDependencies';
import { ErrorResponse } from '../../_lib/common/error';
import { userCreatedProducer } from '../../infrastructure/kafka/producers';
import { signupValidation } from '../../_lib/validation';
import { hashPassword } from '../../_lib/bcrypt';
import { generateAccessToken,generateRefreshToken } from '../../_lib/jwt';
import { createResponse, NOTIFICATION_SERVICE_TOPIC, StatusCode } from '../../_lib/common';
import { TOBE } from '../../_lib/utils/Tobe';

export const signupController = (dependencies: IDependencies) => {
    
    const {useCases: {createUserUseCase, findUserByEmailUseCase , verifyOtpUseCase} } = dependencies;

    return async (req: Request, res: Response, next: NextFunction):Promise<void> => {
        try {
            const userCredentials = req.body;
            const {username, email, otp, password, confirmPassword, role} = userCredentials

            console.log(userCredentials,"userCredentials");
            

            if(password !== confirmPassword) next(ErrorResponse.badRequest("Passwords do not match"));
            
            //checking user email is taken or not
            if(!otp){
                try {
                    const userExist: TOBE = await findUserByEmailUseCase(dependencies).execute(email)
                    if(userExist){
                        return next(ErrorResponse.conflict("Email is already registed try another email"));
                    }
                  } catch (error: unknown) {
                    if (error instanceof Error) {
                        console.error("Error USER ALREADY EXISTS:", error.message);
                    } else {
                        console.error("Unknown error USER ALREADY EXISTS");
                    }
                    next(error);
                }
                
            }
    
            // if no user sent otp to user using nodemailer
            if(!otp){
                try {
                  
                    await userCreatedProducer(email,NOTIFICATION_SERVICE_TOPIC);
                     res.status(200).json({
                      success: true,
                      message: "otp sent successfully",
                    })
                    return;
                  } catch (error: unknown) {
                    if (error instanceof Error) {
                        console.error("Something Went Wrong in OTP section:", error.message);
                    } else {
                        console.error("Unknown error in OTP section");
                    }
                    return next(ErrorResponse.badRequest("Something went wrong in OTP"));
                }
                
            }
    
            // verifyotp    
    
            if(otp){
                try {
                    const isOtpVerified = await verifyOtpUseCase(dependencies).execute(email,otp);
                    console.log(isOtpVerified, "otp verifed")
                    if(!isOtpVerified){
                        const { email , ...restValues} = userCredentials;
                            res.status(401).json({
                            user: email,
                            success: false,
                            message: "OTP is Invalid try another",
                          });
                          return;
                    }
                  } catch (error: unknown) {
                    if (error instanceof Error) {
                        console.error("Something went wrong in verifyOtp:", error.message);
                    } else {
                        console.error("Unknown error in verifyOtp");
                    }
                    return next(ErrorResponse.badRequest("OTP invalid"));
                }
                
            }
    
            // create new user if otp is present
            if (otp) {
                try {
                  const { error, value } = signupValidation.validate(req.body);

                  if (error) {
                    throw new Error(error.message);
                  }

                  value.password = await hashPassword(value.password);
                  const userData = await createUserUseCase(dependencies).execute(value);
                  
                  if (!userData) {
                    res.json({
                      success: false,
                      message: "Something Went wrong try again in create user",
                    });
                    return;
                  }

                  const { _id, email,username,role, isNewUser } = userData;
                  
                  //produce-user-creation-message
                  // await userCreatedProducer(userData,'USER_SERVICE_TOPIC');
          
                  const accessToken = generateAccessToken({
                    _id: String(_id),
                    email: email!,
                    role: role!,
                  });
          
                  const refreshToken = generateRefreshToken({
                    _id: String(_id),
                    email: email!,
                    role: role!,
                  });
          
                  res.cookie("access_token", accessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite:"none",
          
                  });
          
                  res.cookie("refresh_token", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite:"none",
                  });
          
                  res.status(StatusCode.SUCCESS).json(
                    createResponse(
                        StatusCode.SUCCESS,
                        { _id, email, role, username, isNewUser }, // Pass user data as part of the response
                        "User created!" // Custom message
                    )
                  );
                  return
                } catch (error: unknown) {
                  if (error instanceof Error) {
                      console.error("<<Something went wrong in user signup>>", error.message);
                  } else {
                      console.error("<<Something went wrong in user signup>> Unknown error");
                  }
              }
              
            }
        } catch (error) {
            console.error(error, "Something went wrong in user signup");
            next(error);
        }
    }
}