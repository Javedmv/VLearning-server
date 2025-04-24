import { UserEntity } from "../../../../domain/entities";
import { User } from "../models";

export const findById = async(id:string): Promise<UserEntity | null> => {
    try {
        const existingUser = await User.findOne({_id:id});
        if(!existingUser){
            throw new Error("User does not exist!!");
        }
        return existingUser;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
    
}