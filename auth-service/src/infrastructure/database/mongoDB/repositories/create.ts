import { User } from "../models/User";
import { UserEntity } from "../../../../domain/entities";
import { Otp } from '../models/otpSchema';
import { TOBE } from "../../../../_lib/utils/Tobe";

export const create = async(data:TOBE):Promise<UserEntity | null> => {
    try {
        const { confirmPassword,otp, ...userData } = data;
        console.log(userData, "user data in create repo")
        const newUser = await User.create(userData);
        if(!newUser){
            throw new Error("user creation failed")
        }      

        return newUser as UserEntity;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || "USER CREATION FAILED!!");
        } else {
            throw new Error("USER CREATION FAILED!!");
        }
    }
    
}