import { User } from "../models/User";
import { UserEntity } from "../../../../domain/entities";
import { Otp } from '../models/otpSchema';

export const create = async(data:any):Promise<UserEntity | null> => {
    try {
        const { confirmPassword,otp, ...userData } = data;

        const newUser = await User.create(userData);
        if(!newUser){
            throw new Error("user creation failed")
        }      

        return newUser as UserEntity;
    } catch (error:any) {
        throw new Error(error || "USER CREATION FAILED!!")
    }
}