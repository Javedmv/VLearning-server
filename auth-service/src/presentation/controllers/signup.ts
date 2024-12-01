import {NextFunction,Request, Response} from 'express';
import { IDependencies } from '../../application/interfaces/IDependencies';
import { ErrorResponse } from '../../_lib/common/error';
import { userCreatedProducer } from '../../infrastructure/kafka/producers';
import { signupValidation } from '../../_lib/validation';
import { hashPassword } from '../../_lib/bcrypt';
import { generateAccessToken,generateRefreshToken } from '../../_lib/jwt';

export const signupController = (dependencies: IDependencies) => {
    
    const {useCases: {createUserUseCase, findUserByEmailUseCase , verifyOtpUseCase}, } = dependencies;

    return async (req: Request, res: Response, next: NextFunction):Promise<void> => {   
        try {
            const userCredentials = req.body;
            const {username, email, otp, password, confirmPassword, role} = userCredentials

            console.log(userCredentials,"userCredentials");
            

            if(password !== confirmPassword) next(ErrorResponse.badRequest("Passwords do not match"));
            
            //checking user email is taken or not
            if(!otp){
                try {
                    const userExist: any = await findUserByEmailUseCase(dependencies).execute(email)
                    if(userExist){
                        return next(
                            ErrorResponse.conflict(
                                "Email is already registed try another email"
                            )
                        )
                    }
                } catch (error:any) {
                    console.log(error,"Something went wrong");
                    next(error)
                }
            }
    
            // if no user sent otp to user using nodemailer
            if(!otp){
                try {
                    await userCreatedProducer(email,'auth-service-topic');
                     res.status(200).json({
                      success: true,
                      message: "otp sent successfully",
                    });
                    return;
                  } catch (error: any) {
                    console.log(error, "Something Went Wrong in OTP section");
                    return next(ErrorResponse.badRequest("Something went wrong in otp"))
                  }
            }
    
            // verifyotp    
    
            if(otp){
                try {
                    const isOtpVerified = await verifyOtpUseCase(dependencies).execute(email,otp);
                    
                    if(!isOtpVerified){
                        const { email , ...restValues} = userCredentials;
                         res.status(401).json({
                            user: email,
                            success: false,
                            message: "OTP is Invalid try another",
                          });
                          return;
                    }
                    console.log("otp correct")
                } catch (error:any) {
                    console.log(error, "Something went wrong in verifyOtp");
                    return next(ErrorResponse.badRequest("Otp invalid"))
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
          
                res.status(200).json({
                    success: true,
                    data: {_id, email, role, username, isNewUser},
                    message: "User created!",
                  });
                } catch (error: any) {
                  console.log(error, "<<Something went wrong in user signup>>");
                }
            }
        } catch (error) {
            console.error(error, "Something went wrong in user signup");
            next(error);
        }
    }
}