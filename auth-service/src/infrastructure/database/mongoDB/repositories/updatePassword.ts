import { UserEntity } from "../../../../domain/entities";
import { User } from "../models";

export const updatePassword = async (email:string, password:string): Promise<UserEntity | null> => {
    try {
        const user = User.findOneAndUpdate({email},{password},{new:true}).exec();
        if(!user){
            return null;
        }
        return user;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
    
}